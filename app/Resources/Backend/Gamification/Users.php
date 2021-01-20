<?php

namespace App\Resources\Backend\Gamification;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Users extends Resource
{
    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Gamification.Users.Index')
                ->path('gamification/users')
                ->title('Bruger'),

            'view' => React::create()
                ->component('Gamification.Users.View')
                ->path("gamification/users/view/{user?}")
                ->title('Se bruger')
                ->parent('backend.gamification.users.index'),

        ];
    }
}
