<?php

namespace App\Support\Enums;


class DifficultyLevels extends ExportableEnum
{
    public static $export = true;

    const EASY   = 0;
    const MEDIUM = 1;
    const HARD   = 2;

}
