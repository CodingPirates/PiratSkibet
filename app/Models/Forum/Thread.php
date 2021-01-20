<?php

namespace App\Models\Forum;

use App\Events\Forum\Thread\Updated;
use App\Jobs\Sorting\CalculateSortScoreForModel;
use App\Models\Change;
use App\Models\Moderation\ModerationAction;
use App\Models\Moderation\ModerationCase;
use App\Models\Projects\Project;
use App\Models\User\User;
use App\Support\Contracts\Moderateable;
use App\Support\Contracts\OwnedByUser;
use App\Support\Enums\ModerationActions;
use App\Support\Enums\SystemStatus;
use App\Support\Services\Moderation\Actions\ActivateModerateable;
use App\Support\Services\Moderation\Actions\ArchiveModerateable;
use App\Support\Services\Moderation\Actions\Delete;
use App\Support\Services\Moderation\Actions\LockModerateable;
use App\Support\Services\Moderation\Actions\RemoveThreadMessageContent;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasSortableScore;
use App\Support\Traits\Moderation\Blockable;
use App\Support\Traits\Moderation\HasModerationActions;
use App\Support\Traits\Moderation\HasModerationRequests;
use App\Support\Traits\Moderation\RemovableViaRequest;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class Thread extends Model implements Moderateable, OwnedByUser
{

    use HasSortableScore;
    use HasModerationRequests, HasModerationActions, Blockable, RemovableViaRequest;
    use Changeable;

    protected $table = 'forum_threads';

    protected $casts = [
        'id'                       => 'integer',
        'created_by'               => 'integer',
        'is_sticky'                => 'boolean',
        'is_embedded'              => 'boolean',
        'blocked_user'             => 'boolean',
        'grownups_can_participate' => 'boolean',
        'created_at'               => 'datetime:Y-m-d H:i:s P',
        'updated_at'               => 'datetime:Y-m-d H:i:s P',
        'deleted_at'               => 'datetime:Y-m-d H:i:s P',
    ];

    protected $dates = [
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function (Thread $thread) {

            if (empty($thread->created_by) && Auth::check()) {
                $thread->created_by = Auth::id();
            }

        });

    }

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function messages()
    {
        return $this->hasMany(Message::class, 'thread_id');
    }

    public function originalMessage()
    {
        return $this->belongsTo(Message::class, 'original_message_id');
    }

    public function latestMessage()
    {
        return $this->hasOne(Message::class, 'thread_id')->orderBy('created_at', 'DESC');
    }

    public function acceptedAnswer()
    {
        return $this->hasOne(Message::class, 'id', 'accepted_answer_id');
    }

    public function mostPopularMessage()
    {
        return $this->hasOne(Message::class, 'id', 'most_popular_answer_id');
    }

    public function creator()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class, 'created_by')
        );
    }

    public function project()
    {
        return $this->hasOne(Project::class, 'thread_id');
    }


    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function ancestralTopics()
    {
        return $this->hasManyThrough(Topic::class, TopicAncestry::class, 'topic_id', 'id', 'topic_id', 'ancestor_id');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopePublic(Builder $q, bool $force = false)
    {
        if (User::currentUserCanModerate() && !$force) {
            return $q;
        }

        return $q->where('blocked_user', false)
            ->whereIn('status', [
                SystemStatus::ACTIVE,
                SystemStatus::LOCKED,
            ]);
    }

    public function scopeForUser(Builder $q, User $user): Builder
    {
        return $q->where('created_by', $user->id);
    }

    public function scopeOrderByActivity(Builder $q, string $dir = 'asc')
    {
        return $q->orderBy(
            Message::query()
                ->select('created_at')
                ->whereColumn('thread_id', 'forum_threads.id')
                ->orderBy('created_at', $dir)
                ->limit(1),
            $dir
        );
    }

    //////////////////////////////////
    /// Attribute getters
    //////////////////////////////////

    //////////////////////////////////
    /// Attribute setters
    //////////////////////////////////

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

    public function activate()
    {
        $this->status = SystemStatus::ACTIVE;
        $this->save();
    }

    public function isActive()
    {
        return $this->status === SystemStatus::ACTIVE
            && !$this->blocked_user
            && (($this->is_embedded) ? $this->project->isActive() : true);
    }

    public function lock()
    {
        $this->status = SystemStatus::LOCKED;
        $this->save();
    }

    public function archive()
    {
        $this->status = SystemStatus::ARCHIVED;
        $this->save();
    }

    public function updateMostPopularAnswer($silent = false)
    {
        $this->most_popular_answer_id = $this->messages()
            ->withCount('likes')
            ->having('likes_count', '>', 0)
            ->orderBy('likes_count', 'desc')
            ->take(1)
            ->pluck('id')
            ->first();

        $this->save();

        if(!$silent) {
            $this->broadcastUpdate();
        }
    }

    public function createMessage($content, $user = null, $attributes = [])
    {

        if ($user === null) {
            $user = Auth::user();
        }

        $message = new Message();
        $message->thread_id = $this->id;
        $message->user_id = ($user !== null) ? $user->id : null;
        $message->content = $content;

        if (!empty($attributes) && is_array($attributes)) {
            foreach ($attributes as $attribute => $value) {
                $message->{$attribute} = $value;
            }
        }

        $message->save();

        CalculateSortScoreForModel::dispatch($this);

        return $message;
    }

    public function hasMessages()
    {
        return $this->messages()
            ->where('id', '<>', $this->original_message_id)
            ->exists();
    }

    //////////////////////////////////
    /// Muting
    //////////////////////////////////

    public function getMutedAttribute() : bool
    {
        return optional(Auth::user())->threadMuted($this) ?? false;
    }

    public function toggleMute()
    {
        optional(Auth::user())->toggleMuteThread($this);

        return $this;
    }

    //////////////////////////////////
    /// Broadcasting
    //////////////////////////////////

    public function broadcastUpdate()
    {
        event(new Updated($this));
    }

    //////////////////////////////////
    /// Sorting
    //////////////////////////////////

    public function toggleSticky()
    {
        $this->is_sticky = !$this->is_sticky;
        $this->save();

        return $this;
    }

    public function getSortFreshnessAge()
    {
        $message = $this->latestMessage;

        if ($message !== null) {
            return $message->created_at->diffInDays(Carbon::now());
        }

        return $this->created_at->diffInDays(Carbon::now());
    }

    public function getRecentGlobalActivity()
    {
        $key = get_class($this) . '_get_recent_global_activity';

        return Cache::driver('array')->rememberForever($key, function () {
            $global_reaction_activity = MessageReaction::query()->type('like')->where('created_at', '>=', Carbon::now()->subDays(10))->count();
            $global_message_activity = Message::query()->where('created_at', '>=', Carbon::now()->subDays(10))->count();

            return $global_reaction_activity * 0.8 + $global_message_activity * 0.2;
        });
    }

    public function getContributionToRecentGlobalActivity()
    {
        $local_reaction_activity = MessageReaction::query()
            ->type('like')
            ->whereHas('message', function ($q) {
                $q->where('thread_id', '=', $this->id);
            })
            ->where('created_at', '>=', Carbon::now()->subDays(10))
            ->count();

        $local_message_activity = $this->messages()->where('forum_messages.created_at', '>=', Carbon::now()->subDays(10))->count();

        return $local_reaction_activity * 0.8 + $local_message_activity * 0.2;
    }


    //////////////////////////
    /// Moderation
    //////////////////////////

    public function getResponsibleUserId(): int
    {
        return $this->created_by;
    }

    public function getModerationActionsAttribute(): array
    {
        return array_merge($this->getCommonModerationActions(), array_filter([
            LockModerateable::class,
            ArchiveModerateable::class,
            ActivateModerateable::class,
            RemoveThreadMessageContent::class,
            $this->removalHasBeenRequested() ? Delete::class : null,
        ]));
    }

    public function getCustomAutomaticResolutionActions(bool $willSuspendUser): array
    {
        $actions = [];

        // Voluntary moderation I.e. Removal request
        if (!$willSuspendUser) {
            $actions[ModerationActions::REMOVE_THREAD_MESSAGE_CONTENT] = [];
        }

        // Regular Auto Moderation OR Voluntary but Empty
        if ($willSuspendUser || !$this->hasMessages()) {
            $actions[ModerationActions::LOCK_MODERATEABLE] = [];
        }


        return $actions;
    }

    public function isDeleted()
    {
        return $this->created_by === null;
    }

    public function delete()
    {
        optional($this->originalMessage()->first())->delete();

        $this->subject    = '[Slettet]';
        $this->created_by = null;
        $this->saveWithoutLogging();

        Change::query()
            ->where(function (Builder $q) {
                $q->where('changeable_type', static::class)
                    ->where('changeable_id', $this->id);
            })
            ->where(function (Builder $q) {
                $q->where('column_name', 'subject')
                    ->orWhere('column_name', 'created_by');
            })
            ->delete();
    }

    public function afterDeleteModeration(ModerationCase $case, ModerationAction $log)
    {
        if ($this->status === SystemStatus::ARCHIVED) {
            return;
        }

        if (!$this->hasMessages()) {
            $case->performAsyncModeration(ArchiveModerateable::class, null, $log);
        }
    }

}
