<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Moderation\ModerationAction;
use App\Models\Moderation\ModerationRequest;
use App\Support\Enums\ModerationActionType;
use App\Support\Enums\ModerationCaseStatus;
use App\Support\Services\Moderation\Abstracts\Action;
use App\Support\Services\Moderation\ModerationActionException;

class Open extends Action
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
        if (isset($args[0]) && ($moderation_request = $args[0]) instanceof ModerationRequest) {
            $this->meta = [
                'moderation_request_id' => $moderation_request->id,
            ];
        }

        $this->case->status = ModerationCaseStatus::PENDING;
        $this->case->save();
    }

    protected function canPerform(): bool
    {
        return parent::canPerform() && !in_array($this->case->status, [
                ModerationCaseStatus::PENDING,
                ModerationCaseStatus::AUTOMATICALLY_MODERATED,
            ]);
    }

    protected function makeAction(string $note = null): ModerationAction
    {
        return tap(parent::makeAction($note), function ($action) {
            $action->user_id = null;
        });
    }
}
