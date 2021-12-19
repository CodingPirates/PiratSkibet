<?php

namespace App\Support\Traits;


use Illuminate\Support\Str;

trait LinksToYoutube
{

    public static function extractYoutubeVideoId(string $id): string
    {
        $parts = parse_url($id);

        if (isset($parts['query'])) {
            parse_str($parts['query'], $query);

            if (isset($query['v'])) {
                return $query['v'];
            }
        }

        if (isset($parts['path'])) {
            return Str::afterLast($parts['path'], '/');
        }

        return $id;
    }

    public static function getYoutubeVideoLink(string $id): string
    {
        $videoId = static::extractYoutubeVideoId($id);

        return "https://youtu.be/{$videoId}";
    }

    public static function getYoutubeChannelLink(string $id): string
    {
        return "https://www.youtube.com/channel/{$id}";
    }
}
