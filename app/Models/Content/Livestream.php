<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Livestream extends Model
{
    protected $casts = [
        'is_live'  => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function (Livestream $livestream) {
            if ($livestream->is_live && $livestream->isDirty('is_live')) {
                static::query()->update(['is_live' => false]);
            }
        });
    }
}
