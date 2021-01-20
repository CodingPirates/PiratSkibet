<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Enforce HTTPS
    |--------------------------------------------------------------------------
    |
    | Use this value to enforce HTTPS on the installation
    |
    */

    'use_ssl' => env('USE_SSL', true),

    'redirect_to_https' => env('REDIRECT_TO_HTTPS', env('USE_SSL', true)),

];
