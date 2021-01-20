<?php

namespace App\Support\Services\Moderation\Actions;


use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class ActivateModerateable extends Action
{
    CONST TYPE = ModerationActionType::RESOLUTION;

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return mixed
     */
    protected function perform(...$args)
    {
        $this->moderateable->activate();
    }
}
