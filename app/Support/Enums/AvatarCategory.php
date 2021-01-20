<?php

namespace App\Support\Enums;


class AvatarCategory extends ExportableEnum
{
    static $export = true;

    CONST BODY        = 'body';
    CONST HAT         = 'hat';
    CONST EYES        = 'eyes';
    CONST MOUTH       = 'mouth';
    CONST LEGS        = 'legs';
    CONST ARMS        = 'arms';
    CONST ACCESSORIES = 'accessories';
}
