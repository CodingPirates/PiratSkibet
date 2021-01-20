<?php

namespace App\Models\Achievements;


use App\Models\Rewards\UserReward;
use App\Models\User\User;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{

    use Changeable, HasUserGeneratedContent;

    protected $userGeneratedContent = [
        'description',
    ];

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function achievementItems()
    {
        return $this->hasMany(AchievementItem::class);
    }

    public function userRewards()
    {
        return $this->hasMany(UserReward::class);
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeLockedForUser(Builder $q, $user)
    {
        if ($user instanceof User) {
            $user = $user->id;
        }

        return $q->whereDoesntHave('userRewards', function (Builder $q) use ($user) {
            $q->where('user_id', $user);
        });
    }

    public function scopeGrantedToUser(Builder $q, $user)
    {
        if ($user instanceof User) {
            $user = $user->id;
        }

        return $q->whereHas('userRewards', function (Builder $q) use ($user) {
            $q->where('user_id', $user);
        });
    }

    //////////////////////////////////
    /// Method
    //////////////////////////////////

    public function grantAchievement(User $user)
    {
        return $user->rewards()->firstOrCreate([
            'achievement_id' => $this->id,
        ], [
            'name'        => $this->name,
            'description' => $this->description,
        ]);
    }
}
