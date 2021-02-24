<?php

namespace App\Support\Enums;


class LivestreamTypes extends ExportableEnum
{
    public static $export = true;

    public const YOUTUBE         = 'youtube';
    public const YOUTUBE_CHANNEL = 'youtube_channel';
}
