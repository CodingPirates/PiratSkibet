<?php

namespace App\Notifications\System;

use App\Models\ContactSubmission;
use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Support\Enums\ContactSubmissionType;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewContactSubmission extends Notification
{
    use Queueable, Repeatable;

    static public $type = NotificationType::SYSTEM_NEW_CONTACT_SUBMISSION;

    /**
     * @var ContactSubmission
     */
    public $submission;

    /**
     * Create a new notification instance.
     *
     * @param Message $message
     * @param Thread $thread
     */
    public function __construct(ContactSubmission $submission)
    {
        $this->submission = $submission;
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {

        $params = [
            'SubmissionType'    => ContactSubmissionType::translate($this->submission->type),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'contact_submission_id' => $this->submission->id,

            // Link
            'route'      => 'backend.contact.edit',
            'parameters' => ['contact_submission' => $this->submission->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans(static::transKey('msg'), $params),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'contact_submission_id' => $this->submission->id,
        ];
    }
}
