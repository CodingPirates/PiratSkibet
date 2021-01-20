<?php

namespace App\Resources\Backend\Users;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Backend extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Users.Backend.Index')
                ->path('users/backend')
                ->title('Backend brugere'),

            'create' => React::create()
                ->component('Users.Backend.Edit')
                ->path("users/backend/create/{user?}")
                ->title('Opret backend bruger')
                ->parent('backend.users.backend.index'),

            'edit' => React::create()
                ->component('Users.Backend.Edit')
                ->path("users/backend/edit/{user?}")
                ->title('Redigér backend bruger')
                ->parent('backend.users.backend.index'),

        ];
    }

}
