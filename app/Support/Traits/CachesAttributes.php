<?php

namespace App\Support\Traits;

use \Closure;

trait CachesAttributes
{

    public static $cached_attributes = [];

    protected function cache(string $attribute, Closure $getter)
    {
        if (app()->runningInConsole()) {
            return $getter();
        }

        $key = $attribute;
        if(is_callable([$this, 'getKey'])){
            $key = $attribute.'_'.$this->getKey().'_'.static::class;
        }
        return static::$cached_attributes[$key] ?? (static::$cached_attributes[$key] = $getter());
    }

    protected function cacheClear(string $attribute = null)
    {
        $key = $attribute;
        if (is_string($key)) {
            if(is_callable([$this, 'getKey'])){
                $key = $attribute.'_'.$this->getKey().'_'.static::class;
            }
            unset(static::$cached_attributes[$key]);
        } else {
            static::$cached_attributes = [];
        }

        return $this;
    }

    protected function cacheSet(string $attribute, $value)
    {
        $key = $attribute;
        if(is_callable([$this, 'getKey'])){
            $key = $attribute.'_'.$this->getKey().'_'.static::class;
        }
        static::$cached_attributes[$key] = $value;
        return $this;
    }

}
