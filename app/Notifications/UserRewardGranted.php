<?php

namespace App\Notifications;

use App\Models\Rewards\UserReward;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class UserRewardGranted extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::USER_REWARD_GRANTED;

    public $reward;

    /**
     * Create a new notification instance.
     *
     * @param UserReward $reward
     */
    public function __construct(UserReward $reward)
    {
        $this->reward = $reward;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        $count = $notifiable->rewards()->opened(false)->count();

        if ($count < 1) {
            return [
                'type'    => static::$type,
                'user_id' => $notifiable->id,
                'status'  => NotificationStatus::DISABLED,
            ];
        }

        return [
            // General
            'type'       => static::$type,
            'user_id'    => $notifiable->id,
            'status'     => NotificationStatus::ACTIVE,

            // Link
            'route'      => 'app.pirate.pirate',
            'parameters' => ['username' => $notifiable->username],

            // Message
            'title'     => trans(static::transKey('title')),
            'msg'       => trans_choice(static::transKey('msg'), $count),
        ];
    }

    private function getIdentifiers($notifiable): array
    {
        return [
            'user_id' => $notifiable->id,
        ];
    }
}
