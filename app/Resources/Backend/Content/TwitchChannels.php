<?php

namespace App\Resources\Backend\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class TwitchChannels extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Content.TwitchChannels.Index')
                ->path('twitch_channels')
                ->title('Twitch kanaler'),

            'create' => React::create()
                ->component('Content.TwitchChannels.Edit')
                ->path("twitch_channels/create/{twitch_channel?}")
                ->title('Opret Twitch kanal')
                ->parent('backend.content.twitch_channels.index'),

            'edit' => React::create()
                ->component('Content.TwitchChannels.Edit')
                ->path("twitch_channels/edit/{twitch_channel?}")
                ->title('Redigér Twitch kanal')
                ->parent('backend.content.twitch_channels.index'),

        ];
    }

}
