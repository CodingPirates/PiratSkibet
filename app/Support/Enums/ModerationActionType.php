<?php

namespace App\Support\Enums;


class ModerationActionType extends ExportableEnum
{
    CONST RESOLUTION = 'resolution';
    CONST COMMENT    = 'comment';
    CONST SYSTEM     = 'system';
}
