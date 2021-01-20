<?php

namespace App\Support\Contracts;


use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property bool blocked_user
 */
interface OwnedByUser
{

    /**
     * Scope forUser
     *
     * @param Builder $q
     * @param User $user
     * @return Builder
     */
    public function scopeForUser(Builder $q, User $user): Builder;

    /**
     * Update all moderateable instances for the user,
     * To be marked as blocked for user
     *
     * @param User $user
     * @return mixed
     */
    public static function blockForUser(User $user);

    /**
     * Update all moderateable instances for the user,
     * To be marked as NOT blocked for user
     *
     * @param User $user
     * @return mixed
     */
    public static function unblockForUser(User $user);
}
