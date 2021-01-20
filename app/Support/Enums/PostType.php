<?php

namespace App\Support\Enums;

class PostType extends ExportableEnum
{
    public static $export = true;

    //CONST POST    = 'post';
    CONST PAGE    = 'page';
    CONST REVISION = 'revision';
}
