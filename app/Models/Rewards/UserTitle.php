<?php

namespace App\Models\Rewards;

use App\Support\Traits\Changeable;
use App\Support\Traits\Rewardable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class UserTitle extends Model
{
    use Rewardable;
    use Changeable;

    protected $appends = ['selected_by_user'];

    public function selectForUser()
    {
        return optional(Auth::user())->selectTitle($this);
    }

    public function getSelectedByUserAttribute()
    {
        return optional(Auth::user())->title_id === $this->id;
    }
}
