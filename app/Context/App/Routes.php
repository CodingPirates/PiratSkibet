<?php

namespace App\Context\App;

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
