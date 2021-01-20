<?php

namespace App\Support\Enums;

class ForumMessageChangeReason extends ExportableEnum
{

    static $export = true;

    CONST EDIT = 'edit';
    CONST DELETE = 'delete';
    CONST MODERATION = 'moderation';

}
