<?php

namespace App\Support\Enums;

class ChangeType extends ExportableEnum
{

    static $export = true;

    CONST USER_CHANGE     = 'user_change';
    CONST MODERATION      = 'moderation';

}
