<?php

namespace App\Models\Forum;

use App\Events\Forum\Thread\MessageUpdated;
use App\Jobs\Forum\UpdateMostPopularAnswer;
use App\Jobs\Sorting\CalculateSortScoreForModel;
use App\Models\Change;
use App\Models\User\User;
use App\Support\Contracts\Moderateable;
use App\Support\Contracts\OwnedByUser;
use App\Support\Enums\CommonPermissions;
use App\Support\Enums\ForumMessageChangeReason;
use App\Support\Enums\ModerationActions;
use App\Support\Services\Moderation\Actions\Delete;
use App\Support\Services\Moderation\Actions\RemoveMessageContent;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use App\Support\Traits\Moderation\Blockable;
use App\Support\Traits\Moderation\HasModerationActions;
use App\Support\Traits\Moderation\HasModerationRequests;
use App\Support\Traits\Moderation\RemovableViaRequest;
use App\Support\Traits\Reactable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Message extends Model implements Moderateable, OwnedByUser
{
    use HasModerationRequests, HasModerationActions, Blockable, RemovableViaRequest;
    use Reactable;
    use Changeable;
    use HasUserGeneratedContent;

    protected $table = 'forum_messages';
    protected $userGeneratedContent = [
        'content',
    ];

    protected $casts = [
        'user_id'      => 'integer',
        'moderated'    => 'boolean',
        'created_at'   => 'datetime:Y-m-d H:i:s P',
        'updated_at'   => 'datetime:Y-m-d H:i:s P',
        'blocked_user' => 'boolean',
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (Message $message) {
            $message->parseContent();
        });

        static::updating(function (Message $message) {
            if ($message->isDirty('content') && !$message->isDeleted()) {
                $message->parseContent();
                $message->recordChange();
            }
        });

    }

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function originalMessageTo()
    {
        return $this->belongsTo(Thread::class, 'id', 'original_message_id');
    }

    public function thread()
    {
        return $this->belongsTo(Thread::class);
    }

    public function mentions()
    {
        return $this->hasMany(MessageMention::class);
    }

    public function mentionedUsers()
    {
        return $this->hasManyThrough(
            User::class,
            MessageMention::class,
            'message_id', // MessageMention->message_id
            'id', // User->id
            'id', // Message->id
            'user_id' // MessageMention->user_id
        );
    }

    public function changes()
    {
        return $this->hasMany(MessageChange::class);
    }

    public function reactions()
    {
        return $this->hasMany(MessageReaction::class, 'message_id');
    }

    public function user()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class, 'user_id', 'id')
        );
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeIsOriginalMessage(Builder $builder)
    {
        return $builder->whereHas('originalMessageTo');
    }

    public function scopeIsNormalMessage(Builder $builder)
    {
        return $builder->whereDoesntHave('originalMessageTo');
    }

    public function scopePublic(Builder $q, bool $force = false)
    {
        return $q->whereHas('thread', function ($q) use ($force) {
            $q->public($force);
        });
    }

    public function scopeForUser(Builder $q, User $user): Builder
    {
        return $q->where('user_id', $user->id);
    }

    //////////////////////////////////
    /// Attribute getters
    //////////////////////////////////

    public function getIsOriginalAttribute()
    {
        return ($this->id !== null) && ($this->id === optional($this->thread)->original_message_id);
    }

    public function getModeratedAttribute($moderated)
    {
        return $moderated || $this->blocked_user;
    }

    public function getContentAttribute($content)
    {
        $removed = __('misc.moderated');

        return $this->isModerated() ? "[{$removed}]" : $this->correctUserContent($content);
    }

    public function isModerated(User $user = null)
    {
        // Only need to evaluate User, if $moderated === true;
        if (!$this->moderated) return false;

        $user = $user ?? Auth::user();

        return $user === null || !$user->can(CommonPermissions::MODERATE);
    }

    //////////////////////////////////
    /// Attribute setters
    //////////////////////////////////

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

    protected function handleReaction()
    {

        CalculateSortScoreForModel::dispatch($this->thread);

        UpdateMostPopularAnswer::dispatch($this->thread)
            ->onConnection('database')
            ->onQueue('forum');

    }

    public function syncMentions()
    {

        //$regex = "/[\@][\[](?P<username>[^\]]*)[\]][\(](?P<user_id>[\d]*)/";
        $regex = '/<span class="mention" .*? data-value="(?P<username>[^\"]*).*?data-id="(?P<user_id>[\d]*)"/';

        $matches = [];

        preg_match_all($regex, $this->content, $matches);

        $usernames = $matches['username'];
        $user_ids = $matches['user_id'];

        $users = User::query()->whereIn('id', $user_ids)->get()->keyBy('id');

        $mentions = collect();

        if (!empty($usernames) && !empty($user_ids) && count($usernames) === count($user_ids)) {
            foreach ($usernames as $index => $username) {
                $user_id = $user_ids[$index];

                if ($users->has($user_id) && $users->get($user_id)->username === $username) {
                    $mentions->push($users->get($user_id));
                }

            }
        }

        $current_mentions = $this->mentions()->get()->keyBy('user_id');

        if ($mentions->isNotEmpty()) {
            foreach ($mentions as $mention) {
                if (!$current_mentions->has($mention->id)) {
                    /// A mention has been added, create it
                    $this->mentions()->create(['user_id' => $mention->id]);
                }
            }

            /// If a mention has been removed, delete it
            $current_mentions
                ->diffKeys(array_flip($mentions->pluck('id')->all()))
                ->each->delete();

        } else {
            $this->mentions()->delete();
        }

    }

    public function parseContent()
    {
        $this->syncMentions();

        if ($this->isDirty()) {
            //$this->save();
        }

    }

    public function recordChange()
    {

        $change = new MessageChange();

        $change->message_id = $this->id;
        $change->content = $this->getOriginal('content');
        $change->user_id = Auth::id();

        if ($change->user_id === $this->user_id) {
            $change->reason = ForumMessageChangeReason::EDIT;
        } else {
            $change->reason = ForumMessageChangeReason::MODERATION;
        }

        $change->save();

        if ($this->thread) {
            $this->broadcastUpdate();
        }

    }

    public function accept()
    {
        $thread = $this->thread()->first();

        if($thread !== null) {

            $thread->accepted_answer_id = $this->id;
            $thread->save();

            $thread->broadcastUpdate();

        }

        return $thread;
    }

    //////////////////////////////////
    /// Notification Helpers
    //////////////////////////////////

    public function findPageInThread()
    {

        /// This method is used to solve the issue of linking to a specific page in the thread
        /// It is relative to the user, as the user might not always have access to all messages
        /// We use the Message index operation to utilize the same filtering methods as used on the frontend
        /// TODO: Modify operations to make an case like this easier to perform
        /// TODO: meaning that we should essentially be able to only apply all the query filters
        /// TODO: Maybe be can hook into the pipeline at a certain point and skip the remainging pipes?

        try {

            $operation = (new \App\Resources\Api\Forum\Message('api', 'forum.message'))->operation('index');

            $found_on_page = null;
            $page_to_try = 1;

            while ($found_on_page === null) {

                request()->replace(['thread_id' => $this->thread_id, '$page' => $page_to_try]);

                $response = $operation->execute();

                $payload = $response->getOriginalContent();

                $meta = $payload['meta'];

                $page = $meta['filters']['pagination']['page'];
                $pages = $meta['filters']['pagination']['pages'];
                $has_more_pages = $page < $pages;

                $collection = collect($payload['collection']);

                if ($collection->where('id', '=', $this->id)->isNotEmpty()) {
                    $found_on_page = $page;
                    break;
                } else {
                    if ($has_more_pages) {
                        $page_to_try++;
                    } else {
                        break;
                    }
                }

            }

        } catch (\Exception $exception) {
            return 1;
        }

        return $found_on_page;
    }

    //////////////////////////////////
    /// Broadcasting
    //////////////////////////////////

    public function broadcastUpdate()
    {
        event(new MessageUpdated($this));
    }


    //////////////////////////
    /// Moderation
    //////////////////////////

    public function moderate()
    {
        $this->moderated = true;
        $this->save();
    }

    public function getResponsibleUserId(): int
    {
        return $this->user_id;
    }

    public function getModerationActionsAttribute(): array
    {
        return array_merge($this->getCommonModerationActions(), array_filter([
            RemoveMessageContent::class,
            $this->removalHasBeenRequested() ? Delete::class : null,
        ]));
    }

    public function getCustomAutomaticResolutionActions(bool $willSuspendUser): array
    {
        return [
            ModerationActions::REMOVE_MESSAGE_CONTENT => [],
        ];
    }

    public function isDeleted()
    {
        return $this->user_id === null;
    }

    public function delete()
    {
        $this->content      = '[Slettet]';
        $this->user_id      = null;
        $this->moderated    = false;
        $this->blocked_user = false;
        $this->saveWithoutLogging();

        $changes = $this->changes()->get('id')->pluck('id')->all();
        $mentions = $this->mentions()->get('id')->pluck('id')->all();
        $this->changes()->delete();
        $this->mentions()->get()->each->delete(); // Trigger delete event, so notifications get updated

        Change::query()
            ->where(function (Builder $q) use ($mentions, $changes) {
                $q->where(function (Builder $q) {
                    $q->where('changeable_type', static::class)
                        ->where('changeable_id', $this->id);
                })->orWhere(function (Builder $q) use ($changes) {
                    $q->where('changeable_type', MessageChange::class)
                        ->whereIn('changeable_id', $changes);
                })->orWhere(function (Builder $q) use ($mentions) {
                    $q->where('changeable_type', MessageMention::class)
                        ->whereIn('changeable_id', $mentions);
                });
            })
            ->delete();
    }

}
