<?php

namespace App\Policies;

use App\Models\Forum\Thread;
use App\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use MorningTrain\Laravel\Permissions\Policies\PermissionPolicy;

class ForumThreadPolicy extends PermissionPolicy
{
    use HandlesAuthorization;

    public function flag(User $user, Thread $thread)
    {
        return !$user->is_suspended // User can't be blocked
            && !$thread->isDeleted()
            && $thread->userCanFlag($user);
    }

    public function request_removal(User $user, Thread $thread)
    {
        return !$thread->isDeleted()
            && $thread->getResponsibleUserId() === $user->id // Only owner can request deletion
            && !$thread->userHasUnresolvedModerationRequests($user);
    }

    public function create(User $user)
    {
        return !$user->is_suspended; // User can't be blocked
    }

    public function send(User $user, Thread $thread)
    {
        return !$user->is_suspended // User can't be blocked
            && $thread->isActive(); // Thread has to be open/active
    }

}
