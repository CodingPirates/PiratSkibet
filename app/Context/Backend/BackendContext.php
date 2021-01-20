<?php

namespace App\Context\Backend;

use App\Models\User\User;
use Carbon\Carbon;
use MorningTrain\Laravel\Context\Context;
use PermissionsService;

class BackendContext
{

    public function load()
    {
        // Provide a timestamp of the data sent to the environment
        Context::env(function () {
            return [
                'ts' => Carbon::now()->format('Y-m-d H:i:s'),
                'debug' => config('app.debug', true),
                'environment' => env('APP_ENV', 'local'),
                'app' => [
                    'locale' => app()->getLocale(),
                    'name' => config('app.name'),
                    'time' => [
                        'zone' => config('app.timezone', 'UTC'),
                        'now' => Carbon::now()->format('Y-m-d H:i:s P'),
                    ]
                ],
                'broadcasting' => [
                    'pusher' => [
                        'key' => config('broadcasting.connections.pusher.key'),
                        'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                        'encrypted' => config('broadcasting.connections.pusher.options.encrypted'),
                    ]
                ],
            ];
        });

        Context::env(function () {
            return [
                'user' => \Auth::check() ? \Auth::user()->toArray() : null,
                'notification_settings' => User::editableNotifications(),
            ];
        });

        // Exports user permissions
        PermissionsService::export();

        Context::load(Assets::class);
        Context::load(Routes::class);
        //Context::load(Services::class);
        //Context::load(Translations::class);
        Context::load(Components::class);
        Context::load(Resources::class);
        //Context::load(Menus::class);
        Context::load(Enums::class);

    }

}
