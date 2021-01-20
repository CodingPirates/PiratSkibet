<?php

namespace App\Support\Enums;


class ModerationCaseStatus extends ExportableEnum
{
    public static $export = true;

    CONST PENDING                 = 'pending';
    CONST MODERATED               = 'moderated';
    CONST AUTOMATICALLY_MODERATED = 'automatically_moderated';
    CONST REJECTED                = 'rejected';
}
