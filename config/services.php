<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Stripe, Mailgun, SparkPost and others. This file provides a sane
    | default location for this type of information, allowing packages
    | to have a conventional place to find your various credentials.
    |
    */

    'mailgun' => [
        'domain'   => env('MAILGUN_DOMAIN'),
        'secret'   => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key'    => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'sparkpost' => [
        'secret' => env('SPARKPOST_SECRET'),
    ],

    'stripe' => [
        'model'   => \App\Models\User\User::class,
        'key'     => env('STRIPE_KEY'),
        'secret'  => env('STRIPE_SECRET'),
        'webhook' => [
            'secret'    => env('STRIPE_WEBHOOK_SECRET'),
            'tolerance' => env('STRIPE_WEBHOOK_TOLERANCE', 300),
        ],
    ],

    'twitch' => [
        'user_id'       => env('TWITCH_USER_ID', ''),
        'client_id'     => env('TWITCH_CLIENT_ID', ''),
        'client_secret' => env('TWITCH_CLIENT_SECRET', ''),
    ],

    'google' => [
        'recaptcha' => [
            'base_uri' => 'https://www.google.com/recaptcha/api/',
            'key'      => env('RECAPTCHA_SITE_KEY'),
            'secret'   => env('RECAPTCHA_SITE_SECRET'),
        ],
    ],

    'tenor' => [
        'key' => env('TENOR_API_KEY', '')
    ],

    'bugsnag' => [
        'key'	        => env('BUGSNAG_API_KEY', null),
        'notify_stages'	=> env('BUGSNAG_NOTIFY_RELEASE_STAGES', 'production')
    ],

    'instagram' => [
        'url' => env('INSTAGRAM_LINK', null),
    ],

    'discord' => [
        'url' => env('DISCORD_LINK', null),
    ],

];
