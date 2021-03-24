<?php

namespace App\Context\App;


use App\Models\Content\Livestream;
use App\Models\Content\Meeting;
use App\Models\Content\TwitchChannel;
use App\Models\User\User;
use App\Support\Facades\Shutdown;
use Carbon\Carbon;
use MorningTrain\Laravel\Context\Context;
use PermissionsService;

class AppContext
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
                'recaptcha' => [
                    'key' => config('services.google.recaptcha.key'),
                ],
                'broadcasting' => [
                    'pusher' => [
                        'key' => config('broadcasting.connections.pusher.key'),
                        'cluster' => config('broadcasting.connections.pusher.options.cluster'),
                        'encrypted' => config('broadcasting.connections.pusher.options.encrypted'),
                    ]
                ],
                'shutdown' => Shutdown::getEnv(),
                'content' => [
                    'twitch'      => [
                        'channels' => TwitchChannel::get(),
                    ],
                    'livestreams' => Livestream::live()->get(),
                    'meeting' => Meeting::export(),
                    'helper_bot' => [
                        'app.forum.overview'    => 'https://www.youtube.com/watch?v=3m1ZMHQ2ExM', // Piratsnak
                        'app.projects.overview' => 'https://www.youtube.com/watch?v=wAn8qPn650Q', // Showcase
                        'app.courses.overview'  => 'https://www.youtube.com/watch?v=feGXSvtxoPs', // Kodehavet
                        'app.tv.index'          => 'https://www.youtube.com/watch?v=jnikyLKpWL0', // Coding Pirates TV
                    ],
                ],
                'services' => [
                    'tenor' => [
                        'key' => config('services.tenor.key')
                    ],
                    'instagram' => [
                        'url' => config('services.instagram.url'),
                    ],
                    'discord' => [
                        'url' => config('services.discord.url'),
                    ],
                ]
            ];
        });

        Context::env(function () {
            return [
                'user'          => \Auth::check() ? \Auth::user()->toArray() : null,
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
