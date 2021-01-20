<?php

namespace App\Context;


use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Context\Context;
use MorningTrain\Laravel\React\React;

class BaseContext
{

    public function load()
    {
        $this->configureMeta();
        $this->configureReact();
        $this->exportLocalization();
    }

    protected function exportLocalization()
    {
        Context::env(function () {
            return [
                'authenticated' => Auth::check(),

                'bugsnag'	    => [
                    'key'	        => config('services.bugsnag.key'),
                    'notify_stages'	=> explode(',', config('services.bugsnag.notify_stages')),
                ],

            ];
        });
    }

    protected function configureMeta()
    {
        // The meta is similar to a repository of
        // variables that we can use in the views
        Context::meta([
            // siteTitle is used in layouts.html to generate the title
            'siteTitle' => config('app.name')
        ]);
    }

    protected function configureReact()
    {
        React::config([
            'host' => config('react.host', 'http://localhost:3000'),
            'markup' => false,
            'namespace' => 'components'
        ]);
    }
}
