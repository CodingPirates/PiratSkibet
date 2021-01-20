<?php

namespace App\Resources\Backend\Gamification;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Achievements extends Resource
{
    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Gamification.Achievements.Index')
                ->path('gamification/achievements')
                ->title('Achievements'),

            'create' => React::create()
                ->component('Gamification.Achievements.Edit')
                ->path("gamification/achievements/create/{achievement?}")
                ->title('Opret achievement')
                ->parent('backend.gamification.achievements.index'),

            'edit' => React::create()
                ->component('Gamification.Achievements.Edit')
                ->path("gamification/achievements/edit/{achievement?}")
                ->title('Redigér achievement')
                ->parent('backend.gamification.achievements.index'),

        ];
    }
}
