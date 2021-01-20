<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Moderation\Appeal as AppealModel;
use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class Appeal extends Action
{
    CONST TYPE = ModerationActionType::SYSTEM;

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return mixed
     */
    protected function perform(...$args)
    {
        if (isset($args[0]) && ($appeal = $args[0]) instanceof AppealModel) {
            $this->meta = [
                'appeal_id' => $appeal->id,
            ];
        }

    }

    protected function afterExecute(ModerationAction $log)
    {
        if (!$this->case->is_pending) {
            $this->case->performAsyncModeration(Open::class, null, $log);
        }

        parent::afterExecute($log);
    }
}
