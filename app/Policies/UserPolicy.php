<?php

namespace App\Policies;

use App\Models\User\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use PermissionPolicy;

class UserPolicy extends PermissionPolicy
{
    use HandlesAuthorization;

    public function store(User $user, User $account)
    {
        return $user->id === $account->id || $user->can('api.backend.users.user.store');
    }

    public function edit_notifications(User $user, User $account)
    {
        return $user->id === $account->id;
    }

    public function flag(User $user, User $account)
    {
        return $account->userCanFlag($user);
    }

    public function accept_pirate_vows(User $user, User $account)
    {
        return $user->id === $account->id;
    }
}
