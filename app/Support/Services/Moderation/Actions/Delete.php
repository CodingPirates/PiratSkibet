<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Forum\Thread;
use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class Delete extends Action
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
        $this->moderateable->delete();
    }

    protected function afterExecute(ModerationAction $log)
    {
        if (method_exists($this->moderateable, 'afterDeleteModeration')) {
            $this->moderateable->afterDeleteModeration($this->case, $log);
        }

        parent::afterExecute($log);
    }
}
