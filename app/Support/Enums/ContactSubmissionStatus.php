<?php

namespace App\Support\Enums;


class ContactSubmissionStatus extends ExportableEnum
{
    public static $export = true;

    CONST DRAFT     = 'draft';
    CONST SENT = 'sent';
    CONST FAILED = 'failed';
}
