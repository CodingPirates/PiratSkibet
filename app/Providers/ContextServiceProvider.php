<?php

namespace App\Providers;


use App\Context\Backend\BackendContext;
use App\Context\BaseContext;
use App\Context\App\AppContext;
use MorningTrain\Laravel\Context\ContextServiceProvider as ServiceProvider;
use MorningTrain\Laravel\Context\Plugins\Assets\AssetsPlugin;
use MorningTrain\Laravel\Context\Plugins\Env\EnvPlugin;
use MorningTrain\Laravel\Context\Plugins\Menus\MenusPlugin;
use MorningTrain\Laravel\Context\Plugins\Meta\MetaPlugin;
use MorningTrain\Laravel\Context\Plugins\Routes\RoutesPlugin;

class ContextServiceProvider extends ServiceProvider
{

    /**
     * Plugins to load
     *
     * @var array
     */
    protected $plugins = [
        AssetsPlugin::class,
        EnvPlugin::class,
        MenusPlugin::class,
        RoutesPlugin::class,
        MetaPlugin::class,
    ];

    /**
     * Features to define
     *
     * @var array
     */
    protected $contexts = [
        'base'  => BaseContext::class,
        'app'   => AppContext::class,
        'backend' => BackendContext::class,
    ];

    /**
     * Features to load
     *
     * @var array
     */
    protected $load = [
        'base',
    ];

}
