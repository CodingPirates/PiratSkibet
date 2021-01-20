<?php

namespace App\Context\Backend;


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
            'namespace' => 'backend',
            'env' => function () {
                return Context::env()->data() ['env'] ?? [];
            }
        ]);
    }

}
