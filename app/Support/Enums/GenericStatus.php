<?php

namespace App\Support\Enums;


class GenericStatus extends ExportableEnum
{
    public static $export = true;

    CONST DRAFT     = 'draft';
    CONST PUBLISHED = 'published';
}
