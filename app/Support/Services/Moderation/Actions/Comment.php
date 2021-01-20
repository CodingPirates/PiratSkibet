<?php

namespace App\Support\Services\Moderation\Actions;


use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class Comment extends Action
{
    CONST TYPE = ModerationActionType::COMMENT;

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return mixed
     */
    protected function perform(...$args)
    {
        // Nothing to do here, we just want to save the provided note in the log
    }
}
