<?php

namespace App\Resources\Backend;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Login extends Resource
{

    public function operations()
    {
        return [
            'index' => React::create()->path('login')->component('Login')
        ];
    }

}
