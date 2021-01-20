<?php

use Illuminate\Database\Seeder;
use App\Models\Forum\Thread;
use App\Models\Forum\Message;
use App\Models\User\User;

class TwitchChannelsSeeder extends Seeder
{
    public function run()
    {

        $channels = [
            'codingpiratesdenmark' => '4JjXzyeU2BXYKQ',
        ];

        foreach ($channels as $channel => $collection) {
            $ticker = new \App\Models\Content\TwitchChannel();
            $ticker->channel_name = $channel;
            $ticker->collection = $collection;
            $ticker->save();
        }

    }
}
