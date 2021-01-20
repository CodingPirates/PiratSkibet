<?php

namespace App\Notifications\Projects;

use App\Models\Projects\Project;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use App\Support\Traits\Notifications\Repeatable;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class ProjectReaction extends Notification implements ShouldQueue
{
    use Queueable, Repeatable;

    static public $type = NotificationType::PROJECT_REACTION;

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
        // Count of all OTHER reactions, so don't include this one
        $count = $this->project->reactions()->endorsement(false)->count() - 1;

        if ($count < 0) {
            return [
                'project_id' => $this->project->id,
                'status'     => NotificationStatus::DISABLED,
            ];
        }

        $class    = Project::class;
        $username = $this->project->reactions()
            ->endorsement(false)
            ->latest()
            ->first()->user->username;

        $params = [
            'user'    => $username,
            'project' => trans_choice("models.{$class}.unspecified", 1),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,
            'project_id' => $this->project->id,

            // Link
            'route'      => 'app.projects.project',
            'parameters' => ['project' => $this->project->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans_choice(static::transKey('msg'), $count, $params),
        ];
    }

    private function getIdentifiers(): array
    {
        return [
            'project_id' => $this->project->id,
        ];
    }
}
