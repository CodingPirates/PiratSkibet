<?php

namespace App\Support\Enums;


abstract class Boolean extends ExportableEnum
{
    public static $export = true;

    CONST YES = 1;
    CONST NO  = 0;

}
