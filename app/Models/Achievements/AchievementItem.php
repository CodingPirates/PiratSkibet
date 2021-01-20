<?php

namespace App\Models\Achievements;


use App\Models\Rewards\UserReward;
use App\Models\Rewards\UserRewardItem;
use App\Models\User\User;
use App\Support\Enums\Rewardable;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class AchievementItem extends Model
{

    use Changeable;

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function achievement()
    {
        return $this->belongsTo(Achievement::class);
    }

    public function item()
    {
        return $this->morphTo();
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeIsOfType($q, $type)
    {

        if (in_array($type, Rewardable::keys())) {
            $type = Rewardable::getValue($type);
        }

        return $q->where('item_type', '=', $type);
    }

    //////////////////////////////////
    /// Methods
    //////////////////////////////////

    /**
     * Add $this AchievementItem to the users UserRewardItems, if it didn't exist.
     *
     * @param User $user
     * @return UserRewardItem
     */
    public function giveToUser(User $user, UserReward $reward)
    {
        return $user->rewardItems()->firstOrCreate([
            'item_id'   => $this->item_id,
            'item_type' => $this->item_type,
        ], [
            'user_reward_id' => $reward->id,
        ]);
    }
}
