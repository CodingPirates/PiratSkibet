<?php

namespace App\Models\Projects;


use App\Models\User\User;
use App\Notifications\Projects\ProjectInvitation;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Relations\Pivot;

class Member extends Pivot
{

    use Changeable;

    protected $table = 'project_user';

    protected $casts = [
        'accepted' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        self::created(function (Member $member) {
            $member->sendProjectInvitation();
        });
    }

    //////////////////////////////////
    /// Relations
    //////////////////////////////////

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function project()
    {
        return $this->belongsTo(Project::class, 'project_id');
    }

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

    public function sendProjectInvitation()
    {
        if (!$this->accepted) {
            $this->user->notify(new ProjectInvitation($this->project));
        }
    }
}
