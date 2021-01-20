<?php

namespace App\Notifications\Projects;

use App\Models\Projects\Project;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ProjectInvitation extends Notification implements ShouldQueue
{
    use Queueable, Repeatable;

    static public $type = NotificationType::PROJECT_INVITATION;

    /**
     * @var Project
     */
    public $project;

    /**
     * Create a new notification instance.
     *
     * @param Project $project
     */
    public function __construct(Project $project)
    {
        $this->project = $project;

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
        $invitation = $this->project
            ->users
            ->first(function ($user) use ($notifiable) {
                return $user->id === $notifiable->id;
            });

        // If invitation doesn't exist, or user has already accepted, don't notify
        if ($invitation === null || $invitation->pivot->accepted) {
            return [
                'project_id' => $this->project->id,
                'status'     => NotificationStatus::DISABLED,
            ];
        }

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'project_id' => $this->project->id,

            // Link
            'route'      => 'app.projects.project',
            'parameters' => ['project' => $this->project->id],

            // Message
            'title'      => trans(static::transKey('title')),
            'msg'        => trans(static::transKey('msg'), [
                'owner'   => $this->project->owner->username,
                'project' => $this->project->title,
            ]),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'project_id' => $this->project->id,
        ];
    }
}
