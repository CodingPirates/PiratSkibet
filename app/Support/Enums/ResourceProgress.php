<?php

namespace App\Support\Enums;


class ResourceProgress extends ExportableEnum
{
    static $export = true;

    CONST COMPLETED        = 'completed';
    CONST INCOMPLETE       = 'incomplete';
}
