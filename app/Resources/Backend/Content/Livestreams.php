<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Livestreams extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.Livestreams.Index')
                ->path('livestreams')
                ->title('Livestreams'),

            'create' => React::create()
                ->component('Content.Livestreams.Edit')
                ->path("livestreams/create/{livestream?}")
                ->title('Opret livestream')
                ->parent('backend.content.livestreams.index'),

            'edit' => React::create()
                ->component('Content.Livestreams.Edit')
                ->path("livestreams/edit/{livestream?}")
                ->title('Redigér livestream')
                ->parent('backend.content.livestreams.index'),

        ];
    }

}
