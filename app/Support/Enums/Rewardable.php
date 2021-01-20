<?php

namespace App\Support\Enums;


use App\Models\Avatar\AvatarItem;
use App\Models\Rewards\UserTitle;

class Rewardable extends ExportableEnum
{
    static $export = true;

    CONST USER_TITLE  = UserTitle::class;
    CONST AVATAR_ITEM = AvatarItem::class;
}
