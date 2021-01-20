<?php

namespace App\Support\Enums;

class GenericOrderType extends ExportableEnum
{
    static $export = true;

    CONST MOST_POPULAR  = 'mostPopular';
    CONST LEAST_POPULAR = 'leastPopular';
    CONST LATEST        = 'latest';
    CONST OLDEST        = 'oldest';

}
