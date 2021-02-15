<?php

namespace App\Support\Enums;


use MorningTrain\Laravel\Support\Enum;

class VideoTypes extends Enum
{
    const DEFAULT = self::YOUTUBE;

    const YOUTUBE = 'youtube';
}
