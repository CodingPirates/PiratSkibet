<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Meetings extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.Meetings.Index')
                ->path('meetings')
                ->title('Møder'),

            'create' => React::create()
                ->component('Content.Meetings.Edit')
                ->path("meetings/create/{meeting?}")
                ->title('Opret Møde')
                ->parent('backend.content.meetings.index'),

            'edit' => React::create()
                ->component('Content.Meetings.Edit')
                ->path("meetings/edit/{meeting?}")
                ->title('Redigér Møde')
                ->parent('backend.content.meetings.index'),

        ];
    }

}
