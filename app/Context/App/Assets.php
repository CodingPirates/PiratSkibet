<?php

namespace App\Context\App;


use MorningTrain\Laravel\Context\Context;

class Assets
{
    protected $manifest = '';

    public function load()
    {
        Context::stylesheets([
            asset(mix('css/app.css', $this->manifest))
        ]);

        Context::scripts([
            asset(mix('polyfill.js', 'polyfill')),
            asset('polyfill/filepond-polyfill.min.js'),
            'https://player.twitch.tv/js/embed/v1.js',
            'https://meet.jit.si/external_api.js',
            asset(mix('js/manifest.js', $this->manifest)),
            asset(mix('js/vendor.js', $this->manifest)),
            asset(mix('js/app.js', $this->manifest))
        ]);
    }

}
