<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class News extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.News.Index')
                ->path('news')
                ->title('Nyheder'),

            'create' => React::create()
                ->component('Content.News.Edit')
                ->path("news/create/{news?}")
                ->title('Opret nyhed')
                ->parent('backend.content.news.index'),

            'edit' => React::create()
                ->component('Content.News.Edit')
                ->path("news/edit/{news?}")
                ->title('Redigér nyhed')
                ->parent('backend.content.news.index'),

        ];
    }

}
