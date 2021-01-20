<?php

namespace App\Support\Enums;

class ForumMessageStatus extends ExportableEnum
{

    static $export = true;

    CONST DRAFT         = 'draft';
    CONST PUBLISED      = 'published';
    CONST DELETED       = 'deleted';

}
