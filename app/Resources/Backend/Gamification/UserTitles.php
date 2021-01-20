<?php

namespace App\Resources\Backend\Gamification;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class UserTitles extends Resource
{
    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Gamification.UserTitles.Index')
                ->path('gamification/user_titles')
                ->title('Bruger titler'),

            'create' => React::create()
                ->component('Gamification.UserTitles.Edit')
                ->path("gamification/user_titles/create/{user_title?}")
                ->title('Opret bruger titel')
                ->parent('backend.gamification.user_titles.index'),

            'edit' => React::create()
                ->component('Gamification.UserTitles.Edit')
                ->path("gamification/user_titles/edit/{user_title?}")
                ->title('Redigér bruger titel')
                ->parent('backend.gamification.user_titles.index'),

        ];
    }
}
