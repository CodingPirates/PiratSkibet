<?php

namespace App\Notifications\Forum;

use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewEndorsement extends Notification implements ShouldQueue
{
    use Queueable;

    static public $type = NotificationType::FORUM_ENDORSEMENT;

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
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        if (!$notifiable->shouldNotify($this)) {
            return [];
        }

        return ['broadcast', 'database'];
    }

    protected static function transKey(string $key)
    {
        return 'notifications.' . static::$type . ".{$key}";
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $class    = $this->message->is_original ? Thread::class : Message::class;

        $params = [
            'message' => trans_choice("models.{$class}.unspecified", 1),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,

            // Link
            'route'      => 'app.forum.thread',
            'parameters' => ['thread' => $this->thread->id, '#thread-message-' . $this->message->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans(static::transKey('msg'), $params),
        ];
    }
}
