<?php

namespace App\Models\Rewards;


use App\Models\User\User;
use App\Support\Enums\Rewardable;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class UserRewardItem extends Model
{

    use Changeable;

    protected $fillable = [
        'item_id',
        'item_type',
        'user_id',
        'user_reward_id',
    ];

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function item()
    {
        return $this->morphTo();
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeWhereItem(Builder $q, Model $item)
    {
        return $q->whereItemType(get_class($item))->whereItemId($item->id);
    }

    public function scopeIsOfType($q, $type)
    {

        if (in_array($type, Rewardable::keys())) {
            $type = Rewardable::getValue($type);
        }

        return $q->where('item_type', '=', $type);
    }

    public function scopeForUser($q, $user = null)
    {
        if($user instanceof User) {
            $user = $user->id;
        }

        if (is_numeric($user)) {
            return $q->where('user_id', '=', $user);
        }

        return $q->where('user_id', Auth::id());
    }
}
