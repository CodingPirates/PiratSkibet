<?php

namespace App\Resources\App;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Test extends Resource
{

    static $operations = [
        React::class,
    ];

    public function configureReactOperation(React $operation)
    {
        $operation->component('Test');
        $operation->path('test');
    }

}
