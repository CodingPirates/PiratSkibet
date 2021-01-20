<?php

namespace App\Listeners\Forum;

use App\Events\Forum\Thread\MessageCreated;
use App\Models\Forum\MessageMention;
use App\Models\Forum\MessageReaction as ReactionModel;
use App\Notifications\Forum\MessageReaction;
use App\Notifications\Forum\NewEndorsement;
use App\Notifications\Forum\NewMessage;
use App\Notifications\Forum\UserMentioned;
use App\Support\Enums\ReactionType;

class ForumEventSubscriber
{
    /**
     * Register the listeners for the subscriber.
     *
     * @param  \Illuminate\Events\Dispatcher  $events
     */
    public function subscribe($events)
    {
        $events->listen(
            MessageCreated::class,
            static::class.'@handleNewMessage'
        );

        $events->listen([
            'eloquent.created: ' . MessageMention::class,
            'eloquent.deleted: ' . MessageMention::class,
        ], static::class . '@notifyMentioned');

        $events->listen([
            'eloquent.created: ' . ReactionModel::class,
            'eloquent.deleted: ' . ReactionModel::class,
            ], static::class . '@handleMessageReaction');
    }

    public function handleMessageReaction(ReactionModel $reaction)
    {
        $message = $reaction->message;
        $thread  = $message->thread;

        if ($reaction->type !== ReactionType::ENDORSEMENT) {
            return $message->user->notify(new MessageReaction($message, $thread));
        }

        // Only notify on "first" endorsement
        if ($reaction->exists && $message->reactions()->endorsement(true)->count() === 1) {
            return $message->user->notify(new NewEndorsement($message, $thread));
        }
    }

    public function handleNewMessage($event)
    {
        // Notify thread creator of new comment
        if ($event->thread->created_by !== null && $event->thread->creator->id !== $event->message->user->id) {
            $event->thread->creator->notify(new NewMessage($event->thread));
        }
    }

    public function notifyMentioned(MessageMention $mention)
    {
        $message = $mention->message;
        $thread  = $message->thread;

        $mention->user->notify(new UserMentioned($message, $thread));
    }
}
