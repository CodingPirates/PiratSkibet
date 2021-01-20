<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use MorningTrain\Laravel\Context\Context;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {

            if(Context::is('backend')) {
                return route('backend.login.index');
            }

            return route('app.home.index', ['promptLogin' => true]);
        }
    }
}
