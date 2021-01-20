<?php

use Illuminate\Database\Seeder;
use App\Models\Forum\Thread;
use App\Models\Forum\Message;
use App\Models\User\User;

class AnimatedTickerTextSeeder extends Seeder
{
    public function run()
    {

        $texts = [
            'Ohøj! Velkommen til Piratskibet',
            'Kig dig omkring',
            'Dyk i Kodehavet!',
            'Landkrabber kan blive pirater!',
            'Lær at kode. Det er fedt!',
            'Hurra! Du fandt os!',
            'Ohøj landkrabbe',
        ];

        foreach ($texts as $text) {
            $ticker = new \App\Models\Content\AnimatedTickerText();
            $ticker->text = $text;
            $ticker->save();
        }

    }
}
