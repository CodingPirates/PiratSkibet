<?php

namespace App\Models\Content;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Video extends Model
{
    use Changeable;

    protected $casts = [
        'is_highlighted' => 'boolean',
    ];

    protected $appends = [
        'link',
        'embed_id',
    ];

    /////////////////////////////
    /// Scopes
    /////////////////////////////

    public function scopeHighlighted(Builder $q, bool $highlighted = true): Builder
    {
        return $q->where('is_highlighted', $highlighted);
    }

    /////////////////////////////
    /// Getters
    /////////////////////////////

    public function getEmbedIdAttribute(): string
    {
        // Only type === YouTube
        return static::extractVideoId($this->video_id);
    }

    public function getLinkAttribute(): string
    {
        // Only type === YouTube
        $videoId = static::extractVideoId($this->video_id);

        return "https://youtu.be/{$videoId}";
    }


    /////////////////////////////
    /// Helpers
    /////////////////////////////

    private static function extractVideoId(string $id): string
    {
        // Only type === YouTube
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

}
