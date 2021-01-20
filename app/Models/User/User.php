<?php

namespace App\Models\User;

use App\Events\User\UpgradedToPirate;
use App\Models\Avatar\UserAvatar;
use App\Models\Course\CourseProgress;
use App\Models\Forum\Message;
use App\Models\Forum\MessageReaction;
use App\Models\Forum\Thread;
use App\Models\Moderation\ModerationCase;
use App\Models\Moderation\UserSuspension;
use App\Models\Projects\Member;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectReaction;
use App\Models\Regions\RegionZipcode;
use App\Models\Rewards\UserTitle;
use App\Models\Rewards\UserReward;
use App\Models\Rewards\UserRewardItem;
use App\Notifications\Auth\ResetPassword;
use App\Notifications\Auth\VerifyEmail;
use App\Support\Contracts\Moderateable;
use App\Support\Enums\CommonPermissions;
use App\Support\Enums\LandlubberRequirements;
use App\Support\Enums\NotificationType;
use App\Support\Enums\UserRoles;
use App\Support\Enums\UserStatus;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use App\Support\Traits\Meta\HasMetaAttributes;
use App\Support\Traits\Moderation\HasModerationActions;
use App\Support\Traits\Moderation\HasModerationRequests;
use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Auth;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use PermissionsService;
use Illuminate\Support\Str;

class User extends Authenticatable implements Moderateable, MustVerifyEmail
{
    use HasApiTokens, Notifiable, SoftDeletes, HasRoles, HasMetaAttributes, HasModerationRequests, HasModerationActions;
    use Changeable;
    use HasUserGeneratedContent;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'birthday' => 'date',
    ];

    public $dates = [
        'email_verified_at',
        'last_activity_at',
    ];

    protected $appends = [
        'avatar',
        'zipcode',
        'is_blocked',
        'role_name',
        'has_pending_accusations',
        'title',
        'uncompleted_landlubber_requirements',
    ];

    protected $userGeneratedContent = [
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (User $user) {

            $user->email = $user->email ?? $user->parent_email;

            if(!$user->password) {
                $user->password = bcrypt(Str::random(20));
            }

            if(!$user->age) {
                $user->age = 0;
            }

        });

        static::created(function (User $user) {
            $user->userAvatar()->associate(UserAvatar::setup($user));
            $user->setMeta('notification_settings', static::defaultNotificationSettings(), 'json');
            $user->save();
        });

        static::restored(function (User $user) {
            $user->restoreContent();
        });

        static::addGlobalScope('default_withs', function($q) {
            $q->with('userTitle');
            $q->with('metaAttributes');
        });

        static::saving(function (User $user) {

            if($user->isGrownup()) {

                if($user->isDirty('email')) {
                    $user->email_verified_at = null;
                }
            }

        });

        static::saved(function (User $user) {

            // When user fills out parent_email the first time
            if($user->isChild()) {
                if ($user->isDirty('parent_email')
                    && $user->getOriginal('parent_email') === null
                    && $user->parent_email !== null
                    && !$user->hasVerifiedEmail()) {
                    $user->sendEmailVerificationNotification();
                }
            }

            if($user->hasRole(UserRoles::LANDLUBBER)) {
                $user->attemptToUpgradeLandlubber();
            }

            if($user->isGrownup()) {
                if($user->wasChanged(['email'])) {
                    $user->sendEmailVerificationNotification();
                }
            }


        });

    }

    //////////////////////////
    /// Avatar
    //////////////////////////

    public function userAvatar()
    {
        return $this->belongsTo(UserAvatar::class);
    }

    public function getAvatarAttribute()
    {
        return UserAvatar::getSvgById($this->user_avatar_id) ?? UserAvatar::removedAvatarSvg();
    }


    //////////////////////////
    /// User fallback
    //////////////////////////

    public static function userRelationFallbackWrap(Relation $relation)
    {
        return static::currentUserCanModerate() ?
            $relation->withTrashed() :
            $relation->withDefault(static::getRemovedUserData());
    }

    public static function getRemovedUserData()
    {
        return [
            'username' => __('misc.unknown'),
        ];
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeCurrentUser(Builder $q)
    {
        return $q->user();
    }

    public function scopeUser(Builder $q, $user = null)
    {
        if($user instanceof User) {
            $user = $user->id;
        }

        if (is_int($user)) {
            return $q->where('id', '=', $user);
        }

        return $q->where('id', Auth::id());
    }

    public function scopeStatus(Builder $q, $status)
    {
        switch ($status) {
            case UserStatus::ACTIVE:
                return $q;
            case UserStatus::BLOCKED:
                return $q->onlyTrashed();
            default:
                return $q->withTrashed();
        }
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    //////////////////////////
    /// Permissions & Roles
    //////////////////////////

    public function getUserPermissionsAttribute()
    {
        return PermissionsService::getUserPermissions($this);
    }

    public function getModerationWeightAttribute()
    {
        return config('permissions.moderation.weight.' . optional($this->roles->first())->name, 1);
    }

    public function getRoleNameAttribute()
    {
        return optional($this->roles->first())->name;
    }

    public function isChild()
    {
        return $this->hasRole(UserRoles::children());
    }

    public function isGrownup()
    {
        return $this->hasRole(UserRoles::grownups());
    }

    //////////////////////////
    /// Zipcode
    //////////////////////////

    public function getZipcodeAttribute()
    {
        return $this->getMeta('zipcode');
    }

    public function scopeForRegions(Builder $q, array $regions)
    {
        $zips = RegionZipcode::getZipsForRegions($regions)->all();

        return $q->forZipcodes($zips);
    }

    public function scopeForZipcodes(Builder $q, array $zips)
    {
        return $q->whereHas('metaAttributes', function ($q) use ($zips) {
            return $q->where('name', 'zipcode')
                ->whereIn('value', $zips);
        });
    }


    //////////////////////////
    /// Content
    //////////////////////////

    public function getDescriptionAttribute($description)
    {
        return $this->correctUserContent($description);
    }


    //////////////////////////
    /// Notifications
    //////////////////////////

    /**
     * Perform all checks for whether a notification should be sent to the user
     *
     * @param $instance
     * @return bool
     */
    public function shouldNotify($instance) : bool
    {
        if (property_exists($instance, 'type') && $instance::$type !== null) {
            // Check general notification settings
            if (!$this->canNotify($instance::$type)) {
                return false;
            }

            // Check for muted forum threads
            if (in_array($instance::$type, NotificationType::getForumNotifications()) && isset($instance->thread)) {
                if ($this->threadMuted($instance->thread)) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Check if the user has disabled the specific type of notification
     *
     * @param string $type
     * @return bool
     */
    public function canNotify(string $type) : bool
    {
        // We have to assume that default behavior is true:
        // If new types get added later, they might be ignored, until the settings are updated
        return optional($this->getMeta('notification_settings'))->{$type} !== false;
    }

    public function toggleMuteThread(Thread $thread)
    {
        $this->threadMuted($thread) ? $this->unmuteThread($thread) : $this->muteThread($thread);
    }

    /**
     * Turns all notification off for the specified thread
     *
     * @param Thread $thread
     */
    public function muteThread(Thread $thread)
    {
        $key      = 'muted_threads';
        $existing = $this->getMeta($key, []);

        $this->setMeta($key, array_unique(array_merge($existing, [$thread->id])), 'json');
    }

    /**
     * Unmutes notifications for Thread
     *
     * @param Thread $thread
     */
    public function unmuteThread(Thread $thread)
    {
        $key      = 'muted_threads';
        $existing = $this->getMeta($key, []);

        $this->setMeta($key, array_diff($existing, [$thread->id]), 'json');
    }

    /**
     * Check if thread is muted by user
     *
     * @param Thread $thread
     * @return bool
     */
    public function threadMuted(Thread $thread) : bool
    {
        return in_array($thread->id, $this->getMeta('muted_threads', []));
    }

    public function getNotificationSettingsAttribute()
    {
        $this->getResponsibleUserId();
        return $this->getMeta('notification_settings');
    }

    /**
     * Returns keys for all notification types which are allowed to be editable
     *
     * @return array
     */
    public static function editableNotifications()
    {
        return array_keys(static::defaultNotificationSettings());
    }

    /**
     * Default user notification settings
     * This is also where we essentially define which notifications can be opted out of
     * As these serve as the baseline for editable notifications
     *
     * @return array
     */
    public static function defaultNotificationSettings()
    {
        return [
            NotificationType::WEEKLY_NEWSLETTER => false,
            NotificationType::FORUM_REACTION    => true,
            NotificationType::FORUM_MENTIONED   => true,
            NotificationType::FORUM_NEW_COMMENT => true,
        ];
    }

    //////////////////////////
    /// Moderation
    //////////////////////////

    public function getResponsibleUserId(): int
    {
        return $this->id;
    }

    public function moderationAccusations()
    {
        return $this->hasMany(ModerationCase::class, 'user_id');
    }

    public static function currentUserCanModerate(): bool
    {
        return (bool)optional(Auth::user())->can(CommonPermissions::MODERATE);
    }

    public function getHasPendingAccusationsAttribute()
    {
        return static::currentUserCanModerate() ?
            $this->moderationAccusations()->unresolved()->exists() :
            false;
    }

    public function getIsBlockedAttribute()
    {
        return static::currentUserCanModerate() ?
            $this->trashed() :
            false;
    }

    public function removeAllContent()
    {
        Project::blockForUser($this);
        Message::blockForUser($this);
        Thread::blockForUser($this);
    }

    public function restoreContent()
    {
        Project::unblockForUser($this);
        Message::unblockForUser($this);
        Thread::unblockForUser($this);
    }

    //////////////////////////
    /// Suspensions
    //////////////////////////

    public function suspensions()
    {
        return $this->hasMany(UserSuspension::class, 'user_id');
    }

    public function getIsSuspendedAttribute()
    {
        return $this->suspensions()->active()->exists();
    }

    /**
     * Creates a UserSuspension entry for the supplied period
     *
     * @param Carbon|null $from If null provided, we use now().
     * @param Carbon $to
     * @param User|null $issuer
     */
    public function suspend(?Carbon $from, ?Carbon $to, User $issuer = null)
    {
        $this->suspensions()->create([
            'start_at'  => $from ?? now(),
            'end_at'    => $to,
            'issued_by' => optional($issuer)->id,
        ]);
    }

    //////////////////////////
    /// Achievements / Rewards
    //////////////////////////

    public function rewards()
    {
        return $this->hasMany(UserReward::class);
    }

    public function rewardItems()
    {
        return $this->hasMany(UserRewardItem::class);
    }

    public function userTitle()
    {
        return $this->belongsTo(UserTitle::class, 'title_id');
    }

    public function selectTitle(UserTitle $title)
    {
        if ($this->rewardItems()->whereItem($title)->exists()) {
            $this->userTitle()->associate($title);

            return $this->save();
        }

        return false;
    }

    public function getTitleAttribute()
    {
        if($this->userTitle !== null) {
            return $this->userTitle->title;
        }

        return '';
    }

    //////////////////////////
    /// Landlubber logic
    //////////////////////////

    public function attemptToUpgradeLandlubber()
    {
        if ($this->canUpgradeToPirate()) {
            $this->syncRoles(UserRoles::PIRATE);

            UpgradedToPirate::dispatch($this);
        }
    }

    public function canUpgradeToPirate()
    {
        if (!$this->hasRole(UserRoles::LANDLUBBER)) {
            return false;
        }

        return empty($this->uncompleted_landlubber_requirements);
    }

    public function getUncompletedLandlubberRequirementsAttribute()
    {
        $uncompleted = [];

        foreach (LandlubberRequirements::attributes() as $required_attribute) {
            if (empty($this->getAttribute($required_attribute))) {
                $uncompleted[] = $required_attribute;
            }
        }

        foreach (LandlubberRequirements::meta() as $required_meta_key) {
            if ($this->hasMeta($required_meta_key) === false) {
                $uncompleted[] = $required_meta_key;
            }
        }

        return $uncompleted;
    }

    //////////////////////////
    /// Parent Email verification
    //////////////////////////

    public function getEmailForVerification()
    {
        if($this->isGrownup()) {
            return $this->email;
        }

        return $this->parent_email;
    }

    // \Illuminate\Notifications\RoutesNotifications->routeNotificationFor()
    public function routeNotificationForMail($notification)
    {
        if ($notification instanceof VerifyEmail) {
            return $this->getEmailForVerification();
        }

        return $this->email;
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    //////////////////////////
    /// Statistics
    //////////////////////////

    public function refreshLastActivity()
    {
        $now = now();

        if($this->last_activity_at === null || $this->last_activity_at->diffInSeconds($now) > 30) {
            static::query()
                ->whereKey($this->id)
                ->update(['last_activity_at' => $now]);
        }
    }

    public function getAgeAttribute($age)
    {
        if ($this->birthday !== null && $this->birthday instanceof Carbon) {
            return $this->birthday->age;
        }

        return $age;
    }

    public function courseProgresses()
    {
        return $this->hasMany(CourseProgress::class, 'user_id');
    }

    public function threads()
    {
        return $this->hasMany(Thread::class, 'created_by');
    }

    public function messages()
    {
        return $this->hasMany(Message::class, 'user_id');
    }

    public function messageReactions()
    {
        return $this->hasManyThrough(
            MessageReaction::class,
            Message::class,
            'user_id', // Foreign key on messages table...
            'message_id', // Foreign key on message_reactions table...
            'id', // Local key on users table...
            'id' // Local key on messages table...
        );
    }

    public function projects()
    {
        return $this->hasMany(Project::class, 'owner_id');
    }

    public function participatingProjects()
    {
        return $this->belongsToMany(Project::class)
            ->using(Member::class)
            ->withPivot('accepted')
            ->wherePivot('accepted', true);
    }

    public function projectReactions()
    {
        return $this->hasManyThrough(
            ProjectReaction::class,
            Project::class,
            'owner_id', // Foreign key on projects table...
            'project_id', // Foreign key on project_reactions table...
            'id', // Local key on users table...
            'id' // Local key on projects table...
        );
    }

}
