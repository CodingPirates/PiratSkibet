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

class UserMentioned extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::FORUM_MENTIONED;

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
        $this->message = $message;
        $this->thread  = $thread; // Need this for when entire Thread is muted by user
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        if (!$this->message->mentions()->user($notifiable)->exists()) {
            return [
                'status'     => NotificationStatus::DISABLED,
                'message_id' => $this->message->id,
            ];
        }

        $class  = $this->message->is_original ? Thread::class : Message::class;
        $params = [
            'user'    => data_get($this->message, 'user.username'),
            'message' => trans_choice("models.{$class}.unspecified", 1),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'message_id' => $this->message->id,

            // Link
            'route'      => 'app.forum.thread',
            'parameters' => ['thread' => $this->thread->id, '#thread-message-' . $this->message->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans(static::transKey('msg'), $params),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'message_id' => $this->message->id,
        ];
    }
}
