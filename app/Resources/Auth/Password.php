<?php

namespace App\Resources\Auth;


use App\Operations\ResetPassword;
use MorningTrain\Laravel\Resources\Operations\Auth\ForgotPassword;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Password extends Resource
{
    public function operations()
    {
        return [
            ForgotPassword::create(),
            ResetPassword::create(),
        ];
    }
}
