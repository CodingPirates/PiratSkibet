<?php

namespace App\Policies;

use App\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Notifications\DatabaseNotification;
use PermissionPolicy;

class NotificaionPolicy extends PermissionPolicy
{
    use HandlesAuthorization;

    public function markAsRead(User $user, DatabaseNotification $notification)
    {
        return (
            get_class($user) === $notification->notifiable_type &&
            $user->id === $notification->notifiable_id
        );
    }
}
