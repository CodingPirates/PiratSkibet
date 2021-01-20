<?php

namespace App\Support\Enums;


class ModerationReasons extends ExportableEnum
{
    public static $export = true;

    CONST SPAM               = 'spam';
    const MALICIOUS_CONTENT  = 'malicious_content';
    const DOXING             = 'doxing';
    const IMPERSONATION      = 'impersonation';
    const DISTURBING_CONTENT = 'disturbing_content';
    const DISCRIMINATORY     = 'discriminatory';
    const THREATENING        = 'threatening';
    const INFRINGING         = 'infringing';
    const OTHER              = 'other';
    const REMOVAL_REQUEST    = 'removal_request';

}
