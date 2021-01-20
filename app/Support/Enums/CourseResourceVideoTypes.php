<?php

namespace App\Support\Enums;


use MorningTrain\Laravel\Support\Enum;

class CourseResourceVideoTypes extends Enum
{
    const DEFAULT = 'youtube';

    // TODO - if more are added, pls update CourseResource->setMetaAttribute()
    const YOUTUBE = 'youtube';

}
