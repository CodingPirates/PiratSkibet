<?php

namespace App\Resources\Auth;

use App\Operations\Register as RegisterOperation;
use MorningTrain\Laravel\Resources\Operations\Auth\ResendVerificationEmail;
use MorningTrain\Laravel\Resources\Operations\Auth\VerifyEmail;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Register extends Resource
{
    public function operations()
    {
        return [
            RegisterOperation::create(),

            ResendVerificationEmail::create()
                ->successMessage(trans('auth.verification_link_sent'))
                ->errorMessage(trans('auth.verification_link_error')),

            VerifyEmail::create()
                ->successMessage(trans('auth.email_verified'))
                ->errorMessage(trans('auth.email_verification_error'))
                ->setRedirectTo('/'),
        ];
    }
}
