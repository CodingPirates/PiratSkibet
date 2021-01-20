<?php

namespace App\Policies;

use App\Models\User\User;
use App\Models\Forum\Message;
use App\Support\Enums\ForumThreadType;
use Illuminate\Auth\Access\HandlesAuthorization;
use MorningTrain\Laravel\Permissions\Policies\PermissionPolicy;

class ForumMessagePolicy extends PermissionPolicy
{
    use HandlesAuthorization;

    public function accept(User $user, Message $message)
    {
        return !$user->is_suspended // User can't be blocked
            && !$message->isDeleted()
            && $user->id === optional($message->thread)->created_by // Can only choose accepted answer on owned thread
            && $user->id !== $message->user_id // Can't choose own answer
            && optional($message->thread)->type === ForumThreadType::QUESTION; // The thread has to be a question
    }

    public function store(User $user, Message $message)
    {
        return !$user->is_suspended // User can't be blocked
            && !$message->isDeleted()
            && $user->id === $message->user_id // Can only edit own comments
            && !$message->isModerated($user) // Can't edit moderated comments
            && $message->thread->isActive(); // Can't edit comments in locked/archived threads
    }

    public function like(User $user, Message $message)
    {
        return $this->reaction($user, $message);
    }

    public function endorse(User $user, Message $message)
    {
        return $this->reaction($user, $message);
    }

    private function reaction(User $user, Message $message)
    {
        return !$user->is_suspended // User can't be blocked
            && !$message->isDeleted()
            && $user->id !== $message->user->id // Can't react to own content
            && !$message->isModerated($user) // Can't react to moderated comments
            && $message->user->exists // Can't react to messages created by blocked users
            && $message->thread->isActive(); // Can't react to locked/archived threads
    }

    public function flag(User $user, Message $message)
    {
        return !$user->is_suspended // User can't be blocked
            && !$message->isDeleted()
            && $message->userCanFlag($user);
    }

    public function request_removal(User $user, Message $message)
    {
        return !$message->isDeleted()
            && $message->getResponsibleUserId() === $user->id // Only owner can request deletion
            && !$message->userHasUnresolvedModerationRequests($user);
    }

}
