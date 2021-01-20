<?php

namespace App\Resources\Backend;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Forum extends Resource
{
    public function operations()
    {
        return [

            'index_topics' => React::create()
                ->component('Forum.Topic.Index')
                ->path('forum/topics')
                ->title('Emner'),

            'create_topic' => React::create()
                ->component('Forum.Topic.Edit')
                ->path("forum/topics/create/{topic?}")
                ->title('Opret emne')
                ->parent('backend.forum.index_topics'),

            'edit_topic' => React::create()
                ->component('Forum.Topic.Edit')
                ->path("forum/topics/edit/{topic?}")
                ->title('Redigér emme')
                ->parent('backend.forum.index_topics'),

        ];
    }
}
