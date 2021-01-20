<?php

namespace App\Support\Enums;

class EventStatus extends ExportableEnum
{

    static $export = true;

    CONST DRAFT     = 'draft';
    CONST PUBLISHED = 'published';
    CONST ARCHIVED  = 'archived';

}
