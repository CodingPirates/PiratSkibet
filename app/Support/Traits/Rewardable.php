<?php

namespace App\Support\Traits;


use App\Models\Rewards\UserRewardItem;
use App\Models\User\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

trait Rewardable
{

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function userRewards()
    {
        return $this->morphMany(UserRewardItem::class, 'item');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeForUser(Builder $q, $user = null)
    {
        logger('rewardable', [
            'user'      => $user,
            'is_string' => is_string($user),
            'is_null'   => is_null($user),
            'blank'     => blank($user),
        ]);

        if($user instanceof User) {
            $user = $user->id;
        }

        if (is_numeric($user)) {
            return $q->whereHas('userRewards', function (Builder $q) use ($user) {
                $q->where('user_id', (int)$user);
            });
        }

        return $q->whereHas('userRewards', function (Builder $q) {
            $q->where('user_id', Auth::id());
        });
    }

}
