<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class AnimatedTickerTexts extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.AnimatedTickerTexts.Index')
                ->path('animated_ticker_texts')
                ->title('Animeret ticker tekst'),

            'create' => React::create()
                ->component('Content.AnimatedTickerTexts.Edit')
                ->path("animated_ticker_texts/create/{animated_ticker_text?}")
                ->title('Opret ticker tekst')
                ->parent('backend.content.animated_ticker_texts.index'),

            'edit' => React::create()
                ->component('Content.AnimatedTickerTexts.Edit')
                ->path("animated_ticker_texts/edit/{animated_ticker_text?}")
                ->title('Redigér ticker tekst')
                ->parent('backend.content.animated_ticker_texts.index'),

        ];
    }

}
