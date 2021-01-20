<?php

namespace App\Notifications\Projects;

use App\Models\Projects\Project;
use App\Support\Enums\NotificationStatus;
use App\Support\Enums\NotificationType;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class NewEndorsement extends Notification implements ShouldQueue
{
    use Queueable;

    static public $type = NotificationType::PROJECT_ENDORSEMENT;

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
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        // TODO / should this be muteable
        // if (!$notifiable->shouldNotify($this)) {
        //     return [];
        // }

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
        $class    = Project::class;

        $params = [
            'title'   => $this->project->title,
            'project' => trans_choice("models.{$class}.unspecified", 1),
        ];

        return [
            // General
            'type'       => static::$type,
            'status'     => NotificationStatus::ACTIVE,

            // Link
            'route'      => 'app.projects.project',
            'parameters' => ['project' => $this->project->id],

            // Message
            'title'      => trans(static::transKey('title'), $params),
            'msg'        => trans(static::transKey('msg'), $params),
        ];
    }
}
