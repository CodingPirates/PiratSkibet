<?php

namespace App\Context\Backend;

use MorningTrain\Laravel\Context\Context;

class Routes
{

    public function load()
    {
        Context::routes([
            'app.*',
            'backend.*',
            'api.*',
            'auth.*',
        ]);
    }

}
