<?php

namespace App\Context\App;


use MorningTrain\Laravel\Context\Context;
use MorningTrain\Laravel\React\React;

class Components
{

    public function load()
    {
        $this->configureReact();
    }

    protected function configureReact()
    {
        React::config([
            'markup' => false,
            'cache' => false,
            'namespace' => 'app',
            'env' => function () {
                return Context::env()->data() ['env'] ?? [];
            }
        ]);
    }

}
