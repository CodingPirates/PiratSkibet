<?php

namespace App\Support\Enums;


class UserRoles extends ExportableEnum
{
    public static $export = true;

    CONST ADMIN         = 'admin';
    CONST LANDLUBBER    = 'landlubber';
    CONST PIRATE        = 'pirate';
    CONST MENTOR        = 'mentor';
    CONST MODERATOR     = 'moderator';

    public static function moderators()
    {
        return [static::MODERATOR, static::ADMIN];
    }

    public static function everybody()
    {
        return [static::LANDLUBBER, static::PIRATE, static::MODERATOR, static::MENTOR, static::ADMIN];
    }

    public static function active()
    {
        return [static::ADMIN, static::PIRATE, static::MODERATOR, static::MENTOR];
    }

    public static function facilitators()
    {
        return [static::ADMIN, static::MODERATOR];
    }

    public static function admins()
    {
        return [static::ADMIN];
    }

    public static function backend()
    {
        return ['ADMIN' => static::ADMIN, 'MODERATOR' => static::MODERATOR, 'MENTOR' => static::MENTOR];
    }

    public static function portal()
    {
        return ['LANDLUBBER' => static::LANDLUBBER, 'PIRATE' => static::PIRATE];
    }

    public static function grownups()
    {
        return [static::ADMIN, static::MODERATOR];
    }

    public static function children()
    {
        return [static::LANDLUBBER, static::PIRATE, static::MENTOR];
    }

}
