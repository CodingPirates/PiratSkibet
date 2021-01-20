<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Events extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.Events.Index')
                ->path('events/event')
                ->title('Begivenheder'),

            'create' => React::create()
                ->component('Content.Events.Edit')
                ->path("events/event/create/{event?}")
                ->title('Opret begivenhed')
                ->parent('backend.content.events.index'),

            'edit' => React::create()
                ->component('Content.Events.Edit')
                ->path("events/event/edit/{event?}")
                ->title('Redigér begivenhed')
                ->parent('backend.content.events.index'),

        ];
    }

}
