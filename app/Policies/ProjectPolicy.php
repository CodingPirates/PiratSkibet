<?php

namespace App\Policies;

use App\Models\Projects\Project;
use App\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProjectPolicy
{
    use HandlesAuthorization;

    public function create(User $user)
    {
        return !$user->is_suspended; // User can't be blocked
    }

    public function store(User $user, Project $project)
    {
        // User can't be blocked
        if ($user->is_suspended) return false;

        // If EDIT call
        if ($project->exists) {
            // Check if $user is member
            // Project can't be locked or archived
            return $project->userIsMember($user) && $project->isActive();
        }

        return true;
    }

    /**
     * @param User|null $user
     * @param Project $project
     * @return bool
     */
    public function read(?User $user, Project $project)
    {
        if ($project->isArchived()) return false;
        if ($project->is_published) return true;

        // If project is not published, only members can see it
        return !is_null($user) && $project->userIsRelated($user);
    }

    public function delete(User $user, Project $project)
    {
        return !$user->is_suspended // User can't be blocked
            && $project->isActive() // Project can't be locked or archived
            && $project->userIsOwner($user); // User has to be owner
    }

    public function manage_project_members(User $user, Project $project)
    {
        return !$user->is_suspended // User can't be blocked
            && $project->isActive() // Project can't be locked or archived
            && $project->userIsOwner($user); // User has to be owner
    }

    public function resolve_invite(User $user, Project $project)
    {
        return !$user->is_suspended // User can't be blocked
            && $project->isActive() // Project can't be locked or archived
            && $project->users() // User has to have a unaccepted invite
                ->where('user_id', $user->id)
                ->wherePivot('accepted', false)
                ->exists();
    }

    public function like(User $user, Project $project)
    {
        return $this->reaction($user, $project);
    }

    public function endorse(User $user, Project $project)
    {
        return $this->reaction($user, $project);
    }

    private function reaction(User $user, Project $project)
    {
        return !$user->is_suspended // User can't be blocked
            && $project->isActive() // Project can't be locked or archived
            && $project->owner->exists // Can't react to projects created by blocked users
            && !$project->userIsMember($user); // Members can't like a project
    }

    public function flag(User $user, Project $project)
    {
        return !$user->is_suspended // User can't be blocked
            && $project->userCanFlag($user);
    }
}
