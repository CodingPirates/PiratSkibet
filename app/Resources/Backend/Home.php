<?php

namespace App\Resources\Backend;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Home extends Resource
{

    static $operations = [
        React::class,
    ];

    public function configureReactOperation(React $operation)
    {
        $operation->component('Home');
        $operation->path('/');
    }

}
