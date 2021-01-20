<?php

namespace App\Operations\Avatars;

use App\Models\Avatar\AvatarItem;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class RandomAvatar extends EloquentOperation
{

    const ROUTE_METHOD = 'get';

    protected function beforePipes()
    {
        return [];
    }

    public function handle($entity = null)
    {
        return AvatarItem::getDefaultItems();
    }


}
