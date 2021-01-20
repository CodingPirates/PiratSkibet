<?php

namespace App\Resources\App;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Appeal extends Resource
{

    public function operations()
    {
        return [
            'index' => React::create()
                ->component('Appeal')
                ->path('/appeal/{moderation_case}')
                ->middlewares(['signed']),
        ];
    }

}
