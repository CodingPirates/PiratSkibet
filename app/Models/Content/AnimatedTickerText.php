<?php

namespace App\Models\Content;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class AnimatedTickerText extends Model
{
    use HasTimestamps, Changeable;

    protected $hidden = [
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();
    }

}
