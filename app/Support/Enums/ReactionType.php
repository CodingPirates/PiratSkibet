<?php

namespace App\Support\Enums;

class ReactionType extends ExportableEnum
{

    static $export = true;

    CONST LIKE = 'like';
    CONST ENDORSEMENT = 'endorsement';

}
