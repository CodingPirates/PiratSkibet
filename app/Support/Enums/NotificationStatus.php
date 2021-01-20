<?php

namespace App\Support\Enums;


use MorningTrain\Laravel\Support\Enum;

abstract class NotificationStatus extends Enum
{
    CONST DISABLED = 'disabled';
    CONST ACTIVE   = 'active';

}
