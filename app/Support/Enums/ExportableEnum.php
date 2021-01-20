<?php

namespace App\Support\Enums;


use Illuminate\Support\Str;
use MorningTrain\Laravel\Support\Enum;

abstract class ExportableEnum extends Enum
{
    ////////////////////////////////
    /// Translations
    ////////////////////////////////

    static $namespace = 'enums';

    public static function namespace()
    {
        return static::$namespace . '.' . static::basename();
    }

    public static function basename()
    {
        $className = class_basename(static::class);

        return strtolower(Str::snake($className));
    }

    public static function translate($value, $replace = [])
    {
        $key     = static::namespace() . '.' . $value;
        $default = ucfirst(Str::studly($value));

        return ($trans = trans($key, $replace)) === $key ? $default : $trans;
    }

    public static function options()
    {
        $keys = static::$by_keys ?
            static::keys() :
            static::values();

        return array_reduce($keys, function ($acc, $value) {
            $acc[$value] = static::translate($value);
            return $acc;
        }, []);
    }

    ////////////////////////////////
    /// Exporting
    ////////////////////////////////

    static $export	= false;
    static $raw		= false;
    static $by_keys	= false;

    public static function export()
    {
        if (static::$export) {
            return static::$raw ?
                static::all() :
                static::options();
        }
    }
}
