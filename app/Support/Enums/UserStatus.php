<?php

namespace App\Support\Enums;


class UserStatus extends ExportableEnum
{
    public static $export = true;

    CONST ACTIVE  = 'active';
    CONST BLOCKED = 'blocked';
}
