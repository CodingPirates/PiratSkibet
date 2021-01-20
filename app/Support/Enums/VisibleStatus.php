<?php

namespace App\Support\Enums;


class VisibleStatus extends ExportableEnum
{
    public static $export = true;

    CONST VISIBLE = 'visible';
    CONST HIDDEN  = 'hidden';
}
