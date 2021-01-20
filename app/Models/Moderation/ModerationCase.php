<?php

namespace App\Models\Moderation;


use App\Events\Moderation\ModerationCase\Updated;
use App\Jobs\Moderation\PerformAsyncModeration;
use App\Models\User\User;
use App\Support\Enums\ModerationActions;
use App\Support\Enums\ModerationActionType;
use App\Support\Enums\ModerationCaseStatus;
use App\Support\Services\Moderation\ModerationActionException;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\URL;

class ModerationCase extends Model
{

    use Changeable;

    protected $table = 'moderation_cases';

    protected static function boot()
    {
        parent::boot();

        static::saved(function (ModerationCase $case) {
            // Trigger event for itself AND all it's related cases
            static::query()
                ->forUser($case->user_id)
                ->get()->each->triggerUpdatedEvent();
        });
    }

    //////////////////////////
    /// Relationships
    //////////////////////////

    /**
     * The reported entity
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function moderateable()
    {
        return User::userRelationFallbackWrap(
            $this->morphTo()
        );
    }

    /**
     * The User blamed for the entity
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class)
        );
    }

    /**
     * Moderation actions
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function actions()
    {
        return $this->hasMany(ModerationAction::class);
    }

    /**
     * Moderation requests
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function requests()
    {
        return $this->hasMany(ModerationRequest::class);
    }

    /**
     * Appeals
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function appeals()
    {
        return $this->hasMany(Appeal::class);
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeRelated(Builder $q, ModerationCase $case)
    {
        return $q->exclude($case->id)->forUser($case->user_id);
    }

    public function scopeExclude(Builder $q, $ids)
    {
        return $q->whereNotIn('id', (array)$ids);
    }

    public function scopeUnresolved(Builder $q)
    {
        return $q->whereIn('status', [
            ModerationCaseStatus::PENDING,
            ModerationCaseStatus::AUTOMATICALLY_MODERATED
        ]);
    }

    /**
     * @param Builder $q
     * @param null $user
     * @return mixed
     */
    public function scopeForUser(Builder $q, $user = null)
    {
        if($user instanceof User) {
            $user = $user->id;
        }

        return $q->where('user_id', $user);
    }

    public function scopeWithLastRequestedAt(Builder $q)
    {
        return $q->addSelect(['last_requested_at' => ModerationRequest::select('created_at')
            ->whereColumn('moderation_case_id', 'moderation_cases.id')
            ->orderBy('created_at', 'desc')
            ->limit(1)
        ]);
    }

    public function scopeOrderByUsername(Builder $q, $dir = 'asc')
    {
        $userQuery = User::select('username')
            ->whereColumn('id', 'moderation_cases.user_id')
            ->limit(1);

        // If withTrashed is not applied, it messes up the ordering
        User::currentUserCanModerate() ? $userQuery->withTrashed() : $userQuery;

        return $q->orderBy($userQuery, $dir);
    }

    //////////////////////////
    /// Accessors
    //////////////////////////

    public function getIsPendingAttribute()
    {
        return $this->status === ModerationCaseStatus::PENDING;
    }

    public function getIsResolvedAttribute()
    {
        return $this->status === ModerationCaseStatus::MODERATED;
    }

    public function getModerateableLabelAttribute()
    {
        return trans_choice("models.{$this->moderateable_type}.specified", 1);
    }

    //////////////////////////
    /// Events
    //////////////////////////

    public function triggerUpdatedEvent()
    {
        event(new Updated($this));
    }

    //////////////////////////
    /// Actions
    //////////////////////////

    public function getModerationActionsAttribute()
    {
        return $this->moderateable->moderation_actions;
    }

    public function getManualModerationActionsAttribute()
    {
        return collect($this->moderateable->moderation_actions)
            ->filter(function ($action) {
                return $action::TYPE !== ModerationActionType::SYSTEM;
            })
            ->mapWithKeys(function ($action) {
                return [$action => ModerationActions::translate($action, [
                        'moderateable' => $this->moderateable_label,
                    ])['action'],
                ];
            });
    }

    /**
     * Perform a moderation action
     *
     * @param string $action
     * @param string|null $note
     * @param array $args
     * @return mixed
     */
    public function performModeration(string $action, string $note = null, ...$args)
    {
        if (!class_exists($action) || !in_array($action, $this->moderation_actions)) {
            throw new ModerationActionException("Provided action ${action} is invalid", 400);
        }

        return $action::execute($this, $note, ...$args);
    }

    public function performAsyncModeration(string $action, string $note = null, ...$args)
    {
        PerformAsyncModeration::dispatch($this, $action, $note, ...$args);
    }

    //////////////////////////
    /// Appeals
    //////////////////////////

    public function getAppealUrl()
    {
        return URL::signedRoute('app.appeal.index', [
            'moderation_case' => $this->id,
            'identifier'      => $this->getIdentifier(),
        ]);
    }

    public function getIdentifier()
    {
        return hash_hmac('sha256', static::class.'_'.$this->id, config('app.key'));
    }

    public function hasValidIdentifier($identifier)
    {
        return hash_equals($this->getIdentifier(), $identifier);
    }

    //////////////////////////
    /// Automatic resolution
    //////////////////////////

    public function needsAutomaticResolution()
    {
        if (!$this->is_pending) {
            return false;
        }

        return $this->requestsHaveReachedModerationThreshold() ||
            $this->requests()->unresolvedRemovalRequestForUserId($this->user_id)->exists();
    }

    public function requestsHaveReachedModerationThreshold()
    {
        return $this->getRequestsScore() >= config('permissions.moderation.threshold');
    }

    protected function getRequestsScore()
    {
        return $this->requests()
                ->with('reporter.roles')
                ->get()
                ->pluck('moderation_weight')
                ->sum();
    }
}
