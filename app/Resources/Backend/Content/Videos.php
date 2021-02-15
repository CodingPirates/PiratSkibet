<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Videos extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.Videos.Index')
                ->path('videos')
                ->title('Videoer'),

            'create' => React::create()
                ->component('Content.Videos.Edit')
                ->path("videos/create/{video?}")
                ->title('Opret video')
                ->parent('backend.content.videos.index'),

            'edit' => React::create()
                ->component('Content.Videos.Edit')
                ->path("videos/edit/{video?}")
                ->title('Redigér video')
                ->parent('backend.content.videos.index'),

        ];
    }

}
