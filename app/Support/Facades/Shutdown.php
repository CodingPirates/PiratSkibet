<?php

namespace App\Support\Facades;

use Illuminate\Support\Facades\Facade;

/**
 * @see \App\Support\Services\Shutdown
 */
class Shutdown extends Facade
{
    /**
     * Get the registered name of the component.
     *
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return \App\Support\Services\Shutdown::class;
    }
}
