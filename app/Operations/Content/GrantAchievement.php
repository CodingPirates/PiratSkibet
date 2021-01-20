<?php

namespace App\Operations\Content;

use App\Models\Achievements\Achievement;
use App\Models\User\User;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class GrantAchievement extends EloquentOperation
{
    const ROUTE_METHOD = 'post';

    public function handle($achievement = null)
    {

        validator(request()->all(), [
            'user' => 'required|integer|exists:users,id',
        ])->validate();

        $achievement = parent::handle($achievement);
        $user        = User::findOrFail(request()->input('user'));

        if($achievement === null) {
            return abort(404);
        }

        /** @var Achievement $achievement */
        return $achievement->grantAchievement($user);
    }
}
