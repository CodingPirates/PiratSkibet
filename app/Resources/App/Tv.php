<?php

namespace App\Resources\App;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Tv extends Resource
{

    public function operations()
    {
        return [
            'index' => React::create()
                ->component('Tv.Index')
                ->path('coding-pirates-tv'),
        ];
    }

}
