<?php

namespace App\Support\Enums;


use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Models\Projects\Project;
use App\Models\User\User;

class LandlubberRequirements extends ExportableEnum
{
    public static $export = true;

    CONST ACCEPTED_PIRATE_VOWS = 'accepted_pirate_vows';
    CONST PARENT_EMAIL         = 'parent_email';
    CONST EMAIL_VERIFIED_AT    = 'email_verified_at';
    CONST BIRTHDAY             = 'birthday';
    CONST ZIPCODE              = 'zipcode';

    public static function attributes()
    {
        return [
            static::BIRTHDAY,
        ];
    }

    public static function meta()
    {
        return [
            static::ZIPCODE,
            static::ACCEPTED_PIRATE_VOWS,
        ];
    }


    public static function options()
    {
        $keys = static::$by_keys ?
            static::keys() :
            static::values();

        return collect($keys)
            ->reject(function ($value){
                return in_array($value, [static::PARENT_EMAIL, static::EMAIL_VERIFIED_AT], true);
            })
            ->reduce(function ($acc, $value) {
                $acc[$value] = static::translate($value);
                return $acc;
            });
    }
}
