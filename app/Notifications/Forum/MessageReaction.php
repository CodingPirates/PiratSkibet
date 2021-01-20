<?php

namespace App\Notifications\Forum;

use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class MessageReaction extends Notification implements ShouldQueue
{
    use Queueable, Repeatable;

    static public $type = NotificationType::FORUM_REACTION;

    /**
     * @var Message
     */
    public $message;

    /**
     * @var Thread
     */
    public $thread;

    /**
     * Create a new notification instance.
     *
     * @param Message $message
     * @param Thread $thread
     */
    public function __construct(Message $message, Thread $thread)
    {
        $this->message  = $message;
        $this->thread   = $thread; // Need this for when entire Thread is muted by user

        self::onQueue('notifications');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        // Count of all OTHER reactions, so don't include this one
        $count = $this->message->reactions()->endorsement(false)->count() - 1;

        if ($count < 0) {
            return [
                'message_id' => $this->message->id,
                'status'     => NotificationStatus::DISABLED,
            ];
        }

        $class    = $this->message->is_original ? Thread::class : Message::class;
        $username = $this->message->reactions()
            ->endorsement(false)
            ->latest()
            ->first()->user->username;

        $params = [
            'user'    => $username,
            'message' => trans_choice("models.{$class}.unspecified", 1),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'message_id' => $this->message->id,

            // Link
            'route'      => 'app.forum.message',
            'parameters' => ['thread' => $this->thread->id, 'message' => $this->message->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans_choice(static::transKey('msg'), $count, $params),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'message_id' => $this->message->id,
        ];
    }
}
