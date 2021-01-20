<?php

namespace App\Models\Projects;


use App\Notifications\Projects\ProjectReaction as ReactionNotification;
use App\Notifications\Projects\NewEndorsement as EndorsementNotification;
use App\Support\Abstracts\Reaction;
use App\Support\Enums\ReactionType;
use App\Support\Traits\Changeable;
use Illuminate\Notifications\Notification;

class ProjectReaction extends Reaction
{

    use Changeable;

    protected $table = 'project_reactions';

    protected $fillable = [
        'project_id',
        'user_id',
        'type',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (ProjectReaction $projectReaction) {
            $projectReaction->notify();
        });

        static::deleted(function (ProjectReaction $projectReaction) {
            $projectReaction->notify();
        });
    }


    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    //////////////////////////////////
    /// Notification
    //////////////////////////////////

    protected function notifyUsers(Notification $notification)
    {
        $this->project->members
            ->prepend($this->project->owner)
            ->each
            ->notify($notification);
    }

    protected function notify()
    {
        if ($this->type !== ReactionType::ENDORSEMENT) {
            return $this->notifyUsers(new ReactionNotification($this->project));
        }

        // Only notify on "first" endorsement
        if ($this->exists && $this->project->reactions()->endorsement(true)->count() === 1) {
            return $this->notifyUsers(new EndorsementNotification($this->project));
        }
    }
}
