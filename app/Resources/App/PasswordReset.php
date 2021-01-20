<?php

namespace App\Resources\App;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class PasswordReset extends Resource
{

    public function operations()
    {
        return [
            'reset' => React::create()
                ->component('PasswordReset')
                ->path('/reset-password/{token}')
                ->middlewares(['guest']),
        ];
    }

}
