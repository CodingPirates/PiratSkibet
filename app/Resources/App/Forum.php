<?php

namespace App\Resources\App;

use App\Operations\Forum\RedirectToMessage;
use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Forum extends Resource
{

    public function operations()
    {
        return [
            'overview' => React::create()
                ->forceRedirect(true)
                ->component('Forum.Overview')
                ->path('piratsnak')
                ->title('Piratsnak'),
            'topic' => React::create()
                ->forceRedirect(true)
                ->component('Forum.Topic')
                ->path('piratsnak/emner/{topic}/{topic_slug}'),
            'thread' => React::create()
                ->forceRedirect(true)
                ->component('Forum.Thread')
                ->path('piratsnak/snakke/{thread}'),
            'message' => RedirectToMessage::create()->path('piratsnak/snakke/{thread}/besked/{message}')
        ];
    }

}
