<?php

namespace App\Models\Content;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;

class Video extends Model
{
    use Changeable;

    protected $casts = [
        'is_highlighted' => 'boolean'
    ];
}
