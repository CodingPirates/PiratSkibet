<?php

namespace App\Http\Middleware;

use Laravel\Passport\Http\Middleware\CreateFreshApiToken;

class AlwaysCreateFreshApiToken extends CreateFreshApiToken
{

    /**
     * Determine if the request should receive a fresh token.
     *
     * @param  \Illuminate\Http\Request $request
     * @return bool
     */
    protected function requestShouldReceiveFreshToken($request)
    {

        /// Changed from: return $request->isMethod('GET') && $request->user($this->guard);
        /// The reason for this, is that this will now allow us to return the token in API post requests (login route)
        /// This middleware should not be used on "normal" routes, as it likely is there for a reason

        return $request->user($this->guard);
    }

}