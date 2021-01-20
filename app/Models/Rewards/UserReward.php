<?php

namespace App\Models\Rewards;


use App\Models\Achievements\Achievement;
use App\Models\Achievements\AchievementItem;
use App\Models\User\User;
use App\Notifications\UserRewardGranted;
use App\Support\Enums\Rewardable;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class UserReward extends Model
{

    use Changeable, HasUserGeneratedContent;

    protected $fillable = [
        'name',
        'description',
        'achievement_id',
    ];

    protected $casts =[
        'created_at' => 'datetime:Y-m-d H:i:s O',
    ];

    protected $userGeneratedContent = [
        'description',
    ];

    protected static function boot()
    {
        parent::boot();

        self::created(function (UserReward $reward) {
            $reward->user->notify(new UserRewardGranted($reward));
        });
    }

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function achievement()
    {
        return $this->belongsTo(Achievement::class, 'achievement_id');
    }

    public function achievementItems()
    {
        return $this->hasMany(AchievementItem::class, 'achievement_id', 'achievement_id');
    }

    public function rewardItems()
    {
        return $this->hasMany(UserRewardItem::class, 'user_reward_id');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeOpened(Builder $q, bool $opened = true)
    {
        return $q->whereNull('opened_at', 'and', $opened);
    }

    public function scopeForUser(Builder $q, $user = null)
    {
        if($user instanceof User) {
            $user = $user->id;
        }

        if (is_numeric($user)) {
            return $q->where('user_id', '=', $user);
        }

        return $q->where('user_id', Auth::id());
    }

    public function scopeHasItemType(Builder $q, $type)
    {
        return $q->whereHas('achievementItems', function ($q) use ($type) {
            return $q->isOfType($type);
        });
    }

    //////////////////////////////////
    /// Methods
    //////////////////////////////////

    /**
     * Mark the UserReward as opened, and grant rewards to the user
     *
     * @return Collection of \App\Models\Rewards\UserRewardItems
     * @throws Exception
     */
    public function open()
    {
        if ($this->opened_at !== null) {
            throw new Exception('UserReward has already been opened.');
        }

        return DB::transaction(function () {
            $this->opened_at = now();
            $this->save();

            return $this->achievementItems()
                ->get()
                ->map
                ->giveToUser($this->user, $this)
                ->each
                ->load('item');
        });

    }
}
