<?php

namespace App\Context\Backend;

use MorningTrain\Laravel\Context\Context;
use Illuminate\Support\Facades\Storage;
use App\Support\Enums\ExportableEnum;
use MorningTrain\Laravel\Resources\ResourceRepository;

class Resources
{

    public function load()
    {
        ResourceRepository::export('api');
        ResourceRepository::export('auth');
        ResourceRepository::export('backend');
    }
}
