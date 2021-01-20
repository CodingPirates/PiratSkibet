<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Posts extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.Posts.Index')
                ->path('posts')
                ->title('Indholdssider'),

            'create' => React::create()
                ->component('Content.Posts.Edit')
                ->path("posts/create/{post?}")
                ->title('Opret side')
                ->parent('backend.content.posts.index'),

            'edit' => React::create()
                ->component('Content.Posts.Edit')
                ->path("posts/edit/{post?}")
                ->title('Redigér side')
                ->parent('backend.content.posts.index'),

        ];
    }

}
