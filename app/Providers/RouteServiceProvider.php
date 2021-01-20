<?php

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'App\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();
        $this->mapAppRoutes();
        $this->mapAuthRoutes();
        $this->mapBackendRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapAppRoutes()
    {
        Route::middleware(['web', 'context:app'])
             ->namespace($this->namespace . '\\App')
             ->group(base_path('routes/app.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware(['api', 'guard:api'])
             ->namespace($this->namespace . '\\Api')
             ->group(base_path('routes/api.php'));
    }

    protected function mapAuthRoutes()
    {
        Route::prefix('auth')
            ->middleware(['session', 'api'])
            ->namespace($this->namespace . '\\Auth')
            ->group(base_path('routes/auth.php'));
    }

    protected function mapBackendRoutes()
    {
        Route::middleware(['context:backend', 'web'])
            ->namespace($this->namespace . '\\Backend')
            ->group(base_path('routes/backend.php'));
    }
}
