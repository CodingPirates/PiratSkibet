<?php

namespace App\Notifications\Moderation;

use App\Models\Moderation\ModerationCase;
use App\Models\Moderation\ModerationRequest;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewModerationRequest extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::MODERATION_NEW_REQUEST;

    public $case;
    public $request;

    /**
     * Create a new notification instance.
     *
     * @param ModerationRequest $request
     */
    public function __construct(ModerationRequest $request)
    {
        $this->request = $request;
        $this->case    = $request->case;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        // Count of all OTHER requests, so don't include this one
        $count = $this->case->requests()->count() - 1;

        $username     = $this->request->reporter->username;
        $moderateable = __('enums.models.' . $this->case->moderateable_type);

        $params = [
            'user'         => $username,
            'moderateable' => $moderateable,
        ];


        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'case_id'    => $this->case->id,

            // Link
            'route'      => 'backend.moderation.view_case',
            'parameters' => ['moderation_case'=> $this->case->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans_choice(static::transKey('msg'), $count, $params),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'case_id' => $this->case->id,
        ];
    }
}
