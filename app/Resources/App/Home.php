<?php

namespace App\Resources\App;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Home extends Resource
{

    public function operations()
    {
        return [
            'index' => React::create()->component('Welcome')->path('/')
        ];
    }

}
