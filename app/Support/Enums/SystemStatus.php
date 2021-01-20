<?php

namespace App\Support\Enums;

class SystemStatus extends ExportableEnum
{

    static $export = true;

    CONST ACTIVE   = 'active';
    CONST LOCKED   = 'locked';
    CONST ARCHIVED = 'archived';

}
