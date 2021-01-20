<?php

namespace App\Support\Enums;


class BasicResourceTypes extends ExportableEnum
{
    static $export = true;

    CONST QUESTIONNAIRE = 'questionnaire';
    CONST VIDEO         = 'video';
    CONST TEXT          = 'text';
}
