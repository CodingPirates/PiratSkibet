<?php

namespace App\Support\Enums;

class ForumThreadType extends ExportableEnum
{

    static $export = true;

    CONST QUESTION        = 'question';
    CONST DISCUSSION      = 'discussion';

}
