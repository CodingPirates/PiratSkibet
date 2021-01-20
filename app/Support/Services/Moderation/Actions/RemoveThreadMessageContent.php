<?php

namespace App\Support\Services\Moderation\Actions;


use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class RemoveThreadMessageContent extends Action
{

    CONST TYPE = ModerationActionType::RESOLUTION;

    protected function perform(...$args)
    {
        optional($this->moderateable->originalMessage)->moderate();
    }
}
