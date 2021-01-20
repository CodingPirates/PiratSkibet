<?php

namespace App\Resources\App;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Submissions extends Resource
{

    public function operations()
    {
        return [
            'avatar_item' => React::create()
                ->component('Submissions.AvatarItem')
                ->path('indsend-pirat-avatar-element'),
        ];
    }

}
