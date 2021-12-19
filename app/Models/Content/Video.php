<?php

namespace App\Models\Content;

use App\Models\Projects\Category;
use App\Support\Traits\Changeable;
use App\Support\Traits\LinksToYoutube;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
    /// Relations
    /////////////////////////////

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(
            Category::class,
            'project_category_video',
            'video_id',
            'project_category_id'
        );
    }

    /////////////////////////////
    /// Scopes
    /////////////////////////////

    public function scopeHighlighted(Builder $q, bool $highlighted = true): Builder
    {
        return $q->where('is_highlighted', $highlighted);
    }

    public function scopeForCategory(Builder $q, int $category): void
    {
        $q->whereHas('categories', function (Builder $q) use ($category) {
            return $q->where('id', $category);
        });
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
