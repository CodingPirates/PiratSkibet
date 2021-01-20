<?php

namespace App\Context\Backend;


use MorningTrain\Laravel\Context\Context;

class Assets
{
    protected $manifest = '';

    public function load()
    {
        Context::stylesheets([
            asset(mix('css/backend.css', $this->manifest))
        ]);

        Context::scripts([
            asset(mix('polyfill.js', 'polyfill')),
            asset('polyfill/filepond-polyfill.min.js'),
            asset(mix('js/manifest.js', $this->manifest)),
            asset(mix('js/vendor.js', $this->manifest)),
            asset(mix('js/backend.js', $this->manifest))
        ]);
    }

}
