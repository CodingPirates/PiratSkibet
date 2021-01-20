<?php

namespace App\Support\Enums;


class SelectableAvatarCategory extends ExportableEnum
{
    static $export = true;

    CONST BODY        = 'body';
    CONST HAT         = 'hat';
    CONST ACCESSORIES = 'accessories';
    CONST EYES        = 'eyes';
    CONST MOUTH       = 'mouth';
}
