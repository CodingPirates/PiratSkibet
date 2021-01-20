<?php

namespace App\Support\Traits\Moderation;

use App\Models\User\User;

trait Blockable
{
    public static function blockForUser(User $user)
    {
        static::query()->forUser($user)->update(['blocked_user' => true]);
    }

    public static function unblockForUser(User $user)
    {
        static::query()->forUser($user)->update(['blocked_user' => false]);
    }
}
