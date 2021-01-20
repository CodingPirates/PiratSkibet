<?php

namespace App\Notifications\Forum;

use App\Models\Forum\Thread;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewMessage extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::FORUM_NEW_COMMENT;

    public $thread;

    /**
     * Create a new notification instance.
     *
     * @param Thread $thread
     */
    public function __construct(Thread $thread)
    {
        $this->thread = $thread;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $count = $this->thread->messages()
            ->whereDoesntHave('user', function ($q) use ($notifiable) {
                return $q->where('id', $notifiable->id);
            })
            ->count();

        return [
            // General
            'type'      => static::$type,
            'status'    => NotificationStatus::ACTIVE,
            'thread_id' => $this->thread->id,

            // Link
            'route'      => 'app.forum.thread',
            'parameters' => ['thread' => $this->thread->id], // TODO - link to specific message

            // Message
            'title'     => trans(static::transKey('title')),
            'msg'       => trans_choice(static::transKey('msg'), $count),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'thread_id' => $this->thread->id,
        ];
    }
}
