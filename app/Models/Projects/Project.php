<?php

namespace App\Models\Projects;

use App\Jobs\Sorting\CalculateSortScoreForModel;
use App\Models\Forum\Message;
use App\Models\Forum\MessageReaction;
use App\Models\Forum\Thread;
use App\Models\User\User;
use App\Support\Contracts\Moderateable;
use App\Support\Contracts\OwnedByUser;
use App\Support\Enums\CustomPermissions;
use App\Support\Enums\ForumThreadType;
use App\Support\Enums\GenericStatus;
use App\Support\Enums\ModerationActions;
use App\Support\Enums\SystemStatus;
use App\Support\Services\Moderation\Actions\ActivateModerateable;
use App\Support\Services\Moderation\Actions\ArchiveModerateable;
use App\Support\Services\Moderation\Actions\LockModerateable;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasSortableScore;
use App\Support\Traits\HasUserGeneratedContent;
use App\Support\Traits\Moderation\Blockable;
use App\Support\Traits\Moderation\HasModerationActions;
use App\Support\Traits\Moderation\HasModerationRequests;
use App\Support\Traits\Reactable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use MorningTrain\Laravel\Fields\Files\Models\File;

class Project extends Model implements Moderateable, OwnedByUser
{
    use HasUserGeneratedContent,
        HasModerationRequests,
        HasModerationActions,
        HasSortableScore,
        SoftDeletes,
        Changeable,
        Reactable,
        Blockable;

    protected $table = 'projects';
    protected $casts = [
        'blocked_user' => 'boolean',
    ];

    protected $dates = [
        'published_at',
    ];

    protected $userGeneratedContent = [
        'description',
    ];

    public static $customPermissions = [
        CustomPermissions::MANAGE_PROJECT_MEMBERS,
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Project $project) {
            if (empty($project->owner_id) && Auth::check()) {
                $project->owner_id = Auth::id();
            }
        });

        static::created(function (Project $project) {
            $project->seedThread();
        });

        static::saving(function (Project $project) {
            if ($project->published_at === null && $project->status === GenericStatus::PUBLISHED && $project->isDirty('status')) {
                $project->published_at = now();
            }
        });

        static::deleting(function (Project $project) {
            // We need to load the "files" relation before delete
            // Because the pivot table get's delete on DB level (cascade)
            $project->load('files');
        });
        static::deleted(function (Project $project) {
            // only call cleanup() after final deletion
            if ($project->isForceDeleting()) {
                $project->cleanup();
            }
        });
    }

    public function owner()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class, 'owner_id')
        );
    }

    public function users()
    {
        return $this->belongsToMany(User::class)
            ->using(Member::class)
            ->withPivot('accepted');
    }

    public function members()
    {
        return $this->belongsToMany(User::class)
            ->using(Member::class)
            ->withPivot('accepted')
            ->wherePivot('accepted', true);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class, 'project_project_categories');
    }

    public function reactions()
    {
        return $this->hasMany(ProjectReaction::class, 'project_id');
    }

    public function coverImage()
    {
        return $this->belongsTo(File::class);
    }

    public function thumbnail()
    {
        return $this->belongsTo(File::class);
    }

    public function files()
    {
        return $this->belongsToMany(File::class, 'project_files');
    }

    public function images()
    {
        return $this->files()->where('mime', 'LIKE', 'image/%');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopePublished(Builder $q, $published = true)
    {
        $status = $published ? GenericStatus::PUBLISHED : GenericStatus::DRAFT;

        return $q->where('status', $status);
    }

    public function scopePublic(Builder $q, bool $public = true, bool $force = false)
    {
        if (User::currentUserCanModerate() && !$force) {
            return $q;
        }

        return $q->where('blocked_user', false)
            ->whereIn(
                'system_status',
                [SystemStatus::ACTIVE, SystemStatus::LOCKED],
                'and',
                !$public
            );
    }

    public function scopeForCategories(Builder $q, array $categories)
    {
        foreach ($categories as $category) {
            $q->whereHas('categories', function (Builder $q) use ($category) {
                return $q->where('slug', $category);
            });
        }

        return $q;
    }

    /**
     * All user related projects, including: owned, invited & accepted
     *
     * @param Builder $q
     * @param User|int $user
     * @param bool $includeInvites If false, we will exclude unaccepted invites
     * @return Builder
     */
    public function scopeRelatedToUser(Builder $q, $user, bool $includeInvites = true)
    {
        $id = $user instanceof User ? $user->id : $user;
        $relation = $includeInvites ? 'users' : 'members';

        return $q->ownedBy($id)
            ->orWhereHas($relation, function ($q) use ($id) {
                return $q->where('user_id', $id);
            });
    }

    public function scopeOwnedBy(Builder $q, $user)
    {
        $id = $user instanceof User ? $user->id : $user;

        return $q->where('owner_id', $id);
    }

    public function scopeForUser(Builder $q, User $user): Builder
    {
        return $q->ownedBy($user);
    }

    public function scopeAwaitingResponse(Builder $q, $user)
    {
        $id = $user instanceof User ? $user->id : $user;

        return $q->whereHas('users', function ($q) use ($id) {
            return $q->where('user_id', $id)->where('accepted', false);
        });
    }

    public function scopeMostPopular(Builder $q)
    {
        return $q->orderBy('sort_score', 'desc');
    }

    public function scopeLeastPopular(Builder $q)
    {
        return $q->orderBy('sort_score', 'asc');
    }


    //////////////////////////////////
    /// Attributes
    //////////////////////////////////

    public function getIsPublishedAttribute()
    {
        return $this->status === GenericStatus::PUBLISHED;
    }

    public function getCoverImageUrlAttribute()
    {
        return optional($this->coverImage)->url ?? asset('images/projects/cover.png');
    }

    public function getThumbnailUrlAttribute()
    {
        return optional($this->thumbnail)->url ?? asset('images/projects/thumbnail.png');
    }

    public function getDescriptionAttribute($description)
    {
        return $this->correctUserContent($description);
    }


    //////////////////////////////////
    /// Users
    //////////////////////////////////

    public function getAllUsersAttribute()
    {
        if (!Auth::check() || !Auth::user()->can(CustomPermissions::MANAGE_PROJECT_MEMBERS, $this)) return [];

        return $this->users;
    }

    public function userIsOwner(User $user)
    {
        return $user->id === $this->owner_id;

    }

    public function userIsMember(User $user)
    {
        return $this->userIsOwner($user)
            || $this->members()->where('user_id', $user->id)->exists();
    }

    public function userIsRelated(User $user)
    {
        return $this->userIsOwner($user)
            || $this->users()->where('user_id', $user->id)->exists();
    }

    //////////////////////////////////
    /// Invites
    //////////////////////////////////

    /**
     * Sets current users invitation to accepted, or deletes their invitation.
     *
     * @param bool $accepted
     * @return int|null
     */
    public function resolveInvitation(bool $accepted = true)
    {
        if (!Auth::check()) return null;

        return $accepted ?
            $this->users()->updateExistingPivot(Auth::id(), ['accepted' => true]) :
            $this->users()->detach(Auth::id());
    }

    //////////////////////////////////
    /// Thread
    //////////////////////////////////

    public function thread()
    {
        return $this->belongsTo(Thread::class, 'thread_id');
    }

    public function threadMessages()
    {
        return $this->hasManyThrough(Message::class, Thread::class, 'id', 'thread_id', 'thread_id', 'id');
    }

    public function seedThread()
    {

        if ($this->thread !== null) {
            return;
        }

        $thread = new Thread();

        $thread->is_embedded = true;
        $thread->type = ForumThreadType::DISCUSSION;
        $thread->status = 'active';

        $thread->save();

        $this->thread_id = $thread->id;
        $this->save();

    }

    //////////////////////////////////
    /// Sorting
    //////////////////////////////////

    public function getSortFreshnessAge()
    {

        if ($this->thread) {
            return $this->thread->getSortFreshnessAge();
        }

        return $this->created_at->diffInDays(Carbon::now());
    }

    public function getRecentGlobalActivity()
    {
        $key = get_class($this) . '_get_recent_global_activity';

        return Cache::driver('array')->rememberForever($key, function () {

            $global_reaction_activity = ProjectReaction::query()->type('like')->where('created_at', '>=', Carbon::now()->subDays(10))->count();
            $global_message_reaction_activity = MessageReaction::query()->type('like')->where('created_at', '>=', Carbon::now()->subDays(10))->count();
            $global_message_activity = Message::query()->where('created_at', '>=', Carbon::now()->subDays(10))->count();

            return $global_reaction_activity * 0.7 + $global_message_reaction_activity * 0.25 + $global_message_activity * 0.05;
        });
    }

    public function getContributionToRecentGlobalActivity()
    {
        $local_reaction_activity = $this->likes()
            ->where('created_at', '>=', Carbon::now()->subDays(10))
            ->count();

        $local_message_reaction_activity = MessageReaction::query()
            ->type('like')
            ->whereHas('message', function ($q) {
                $q->where('thread_id', '=', $this->thread_id);
            })
            ->where('created_at', '>=', Carbon::now()->subDays(10))
            ->count();

        $local_message_activity = $this->threadMessages()->where('forum_messages.created_at', '>=', Carbon::now()->subDays(10))->count();

        return $local_reaction_activity * 0.7 + $local_message_reaction_activity * 0.25 + $local_message_activity * 0.05;
    }

    protected function handleReaction()
    {
        CalculateSortScoreForModel::dispatch($this);
    }


    //////////////////////////
    /// System Status
    //////////////////////////

    public function isActive()
    {
        return $this->system_status === SystemStatus::ACTIVE && !$this->blocked_user;
    }

    public function isArchived()
    {
        return $this->system_status === SystemStatus::ARCHIVED || $this->blocked_user;
    }

    public function activate()
    {
        $this->system_status = SystemStatus::ACTIVE;
        $this->save();
    }

    public function lock()
    {
        $this->system_status = SystemStatus::LOCKED;
        $this->save();
    }

    public function archive()
    {
        $this->system_status = SystemStatus::ARCHIVED;
        $this->save();
    }


    //////////////////////////
    /// Moderation
    //////////////////////////

    public function getResponsibleUserId(): int
    {
        return $this->owner_id;
    }

    public function getModerationActionsAttribute(): array
    {
        return array_merge($this->getCommonModerationActions(), [
            LockModerateable::class,
            ArchiveModerateable::class,
            ActivateModerateable::class,
        ]);
    }

    public function getCustomAutomaticResolutionActions(bool $willSuspendUser): array
    {
        return [
            ModerationActions::LOCK_MODERATEABLE => [],
        ];
    }


    //////////////////////////
    /// Misc
    //////////////////////////

    private function cleanup()
    {

        // Eager loaded, to trigger "delete" event
        // Which removes the actual files

        if($this->coverImage !== null) {
            $this->coverImage->delete();
        }

        if($this->thumbnail !== null) {
            $this->thumbnail->delete();
        }

        if($this->files->isNotEmpty()) {
            $this->files->each->delete();
        }

        if($this->thread !== null) {
            $this->thread->delete();
        }

    }

    public static function getNewsletterHiglights($count = 3)
    {
        $baseQuery = static::query()->public()->published();

        $mostPopular = (clone $baseQuery)
            ->whereBetween('published_at', [today()->startOfWeek(), today()->endOfWeek()])
            ->mostPopular()
            ->limit($count)
            ->get();

        if ($mostPopular->count() < $count) {
            $mostPopular = $mostPopular->concat(
                (clone $baseQuery)
                    ->orderBy('published_at', 'desc')
                    ->whereNotIn('id', $mostPopular->pluck('id'))
                    ->limit($count - max(0, $mostPopular->count()))
                    ->get()
            );
        }

        return $mostPopular->map(function (Project $project) {
            return [
                'title' => $project->title,
                'alt'   => $project->title,
                'img'   => $project->thumbnail_url,
                'link'  => route('app.projects.project', ['project' => $project->id]),
            ];
        });
    }
}
