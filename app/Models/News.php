<?php

namespace App\Models;

use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class News extends Model
{
    use HasUserGeneratedContent, HasTimestamps, Changeable;

    protected $dates = ['created_at', 'updated_at', 'publish_at'];

    protected $casts = [
        'featured' => 'boolean'
    ];

    const PURIFIER_CONFIG = 'admin';

    protected $userGeneratedContent = [
        'subtext',
    ];

    protected $hidden = [
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();
    }

    public function scopeIsPublished(Builder $q)
    {
        return $q->where(
            'publish_at',
            '<',
            now()
        )->where('status', 'published');
    }

}
