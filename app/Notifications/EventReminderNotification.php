<?php

namespace App\Notifications;

use App\Models\Events\Event;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class EventReminderNotification extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::EVENT_REMINDER;

    protected $event;

    /**
     * Create a new notification instance.
     *
     * @param Event $event
     */
    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'type'     => static::$type,
            'event_id' => $this->event->id,
            'status'   => NotificationStatus::ACTIVE,
            'title'    => trans(static::transKey('title')),
            'msg'      => trans(static::transKey('msg'), [
                'event' => $this->event->title,
                'start' => $this->event->pretty_start,
            ]),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'event_id' => $this->event->id,
        ];
    }
}
