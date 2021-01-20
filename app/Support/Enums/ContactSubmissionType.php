<?php

namespace App\Support\Enums;


class ContactSubmissionType extends ExportableEnum
{
    public static $export = true;

    CONST GDPR     = 'gdpr';
    CONST COPYRIGHT = 'copyright';
    CONST GENERIC = 'generic';
}
