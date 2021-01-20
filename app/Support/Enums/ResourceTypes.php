<?php

namespace App\Support\Enums;


class ResourceTypes extends ExportableEnum
{
    static $export = true;

    CONST STEP          = 'step';
    CONST QUESTIONNAIRE = 'questionnaire';
    CONST VIDEO         = 'video';
    CONST TEXT          = 'text';

    public static function getProgressableTypes()
    {
        return [
            static::STEP,
        ];
    }
}
