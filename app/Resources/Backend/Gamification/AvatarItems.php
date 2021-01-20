<?php

namespace App\Resources\Backend\Gamification;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class AvatarItems extends Resource
{
    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Gamification.AvatarItems.Index')
                ->path('gamification/avatar_items')
                ->title('Avatar elementer'),

            'create' => React::create()
                ->component('Gamification.AvatarItems.Edit')
                ->path("gamification/avatar_items/create/{avatar_item?}")
                ->title('Opret avatar element')
                ->parent('backend.gamification.avatar_items.index'),

            'edit' => React::create()
                ->component('Gamification.AvatarItems.Edit')
                ->path("gamification/avatar_items/edit/{avatar_item?}")
                ->title('Redigér avatar element')
                ->parent('backend.gamification.avatar_items.index'),

        ];
    }
}
