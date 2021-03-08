<?php

namespace App\Models\Content;

use App\Support\Traits\Changeable;
use App\Support\Traits\LinksToYoutube;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use Changeable;
    use LinksToYoutube;

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
        return static::extractYoutubeVideoId($this->video_id);
    }

    public function getLinkAttribute(): string
    {
        // Only type === YouTube
        return static::getYoutubeVideoLink($this->video_id);
    }

}
