<?php

namespace App\Models;

use Closure;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\File as FileHTTP;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Files\Filepond;

class File extends \MorningTrain\Laravel\Fields\Files\Models\File
{
    public function getUrlAttribute()
    {
        if($this->disk === 's3') {
            return $this->storage->temporaryUrl($this->path, now()->addMinute());
        }

        return $this->storage->url($this->path);
    }
}

