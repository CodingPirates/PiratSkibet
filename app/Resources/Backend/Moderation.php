<?php

namespace App\Resources\Backend;


use App\Operations\Moderation\NextModerationCase;
use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Moderation extends Resource
{

    public function operations()
    {
        return [
            'index_cases' => React::create()
                ->component('Moderation.Case.Index')
                ->path('moderation/cases')
                ->title('Sager'),

            'next_case' => NextModerationCase::create()->path('moderation/cases/next/{except?}'),

            'view_case'   => React::create()
                ->component('Moderation.Case.View')
                ->path("moderation/case/view/{moderation_case}")
                ->title('Sag')
                ->parent('backend.moderation.index_cases'),

            'index_suspensions' => React::create()
                ->component('Moderation.Suspension.Index')
                ->path('moderation/suspensions')
                ->title('Suspenderinger'),

            'edit_suspension' => React::create()
                ->component('Moderation.Suspension.Edit')
                ->path("moderation/suspension/edit/{user_suspension}")
                ->title('Suspenderinger')
                ->parent('backend.moderation.index_suspensions'),
        ];
    }

}
