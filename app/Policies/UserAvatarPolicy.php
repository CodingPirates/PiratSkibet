<?php

namespace App\Policies;

use App\Models\Avatar\UserAvatar;
use App\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use PermissionPolicy;

class UserAvatarPolicy extends PermissionPolicy
{
    use HandlesAuthorization;

    public function read(User $user, UserAvatar $avatar)
    {
        return $user->user_avatar_id === $avatar->id;
    }

    public function store(User $user, UserAvatar $avatar)
    {
        return $user->user_avatar_id === $avatar->id;
    }
}
