<?php

namespace App\Models\Content;

use Illuminate\Database\Eloquent\Model;

class Livestream extends Model
{
    protected $casts = [
        'is_live'  => 'boolean',
    ];
}
