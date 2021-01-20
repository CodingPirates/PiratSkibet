<?php

namespace App\Resources\App;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Pirate extends Resource
{

    public function operations()
    {
        return [
            'pirate' => React::create()
                ->component('Pirate')
                ->path('pirat/{username}'),
        ];
    }
}
