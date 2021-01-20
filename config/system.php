<?php

return [

    /*
    |--------------------------------------------------------------------------
    | "Upgrade to Pirate" reminder email settings
    |--------------------------------------------------------------------------
    */

    'signup_reminders' => [
        'days_since_first'  => env('FIRST_SIGNUP_REMINDER', 2),
        'days_since_second' => env('SECOND_SIGNUP_REMINDER', 14),
        'send_at_hours'     => env('REMINDER_EMAIL_TIME', 14),
    ]
];
