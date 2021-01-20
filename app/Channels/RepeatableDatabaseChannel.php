<?php

namespace App\Channels;


use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Channels\DatabaseChannel;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Arr;

class RepeatableDatabaseChannel extends DatabaseChannel
{

    /**
     * Send the given notification.
     *
     * @param  mixed  $notifiable
     * @param  Notification  $notification
     * @return Model
     */
    public function send($notifiable, Notification $notification)
    {
        if (static::isRepeatable($notification)) {
            return $this->repeatSend($notifiable, $notification);
        }

        return parent::send($notifiable, $notification);
    }

    protected function repeatSend($notifiable, Notification $notification)
    {
        $query = $notifiable->routeNotificationFor('database', $notification);
        $predecessor = $notification->getPredecessor($notifiable, (clone $query));

        return $query->updateOrCreate([
                'id'   => optional($predecessor)->id ?? $notification->id,
                'type' => get_class($notification),
            ],
            $this->buildPayload($notifiable, $notification)
        );
    }

    /**
     * @param Notification $notification
     * @return bool
     */
    public static function isRepeatable(Notification $notification) : bool
    {
        return Arr::has(
            class_uses_recursive(get_class($notification)),
            Repeatable::class
        );
    }
}
