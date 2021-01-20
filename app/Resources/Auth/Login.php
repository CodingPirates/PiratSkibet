<?php

namespace App\Resources\Auth;


use App\Operations\Login as LoginOperation;
use MorningTrain\Laravel\Resources\Operations\Auth\Logout;
use App\Operations\Refresh;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Login extends Resource
{
    public function operations()
    {
        return [
            LoginOperation::create(),
            Logout::create(),
            Refresh::create(),
        ];
    }
}
