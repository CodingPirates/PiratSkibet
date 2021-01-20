<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Enums\ModerationCaseStatus;
use App\Support\Services\Moderation\Abstracts\Action;

class ModerateAutomatically extends Action
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
        $this->case->status = ModerationCaseStatus::AUTOMATICALLY_MODERATED;
        $this->case->save();

        if (isset($args[0]) && ($moderation_action = $args[0]) instanceof ModerationAction) {
            $this->meta = [
                'moderation_action_id' => $moderation_action->id,
            ];
        }
    }

    protected function canPerform(): bool
    {
        return $this->case->is_pending && parent::canPerform();
    }

    protected function makeAction(string $note = null): ModerationAction
    {
        return tap(parent::makeAction($note), function ($action) {
            $action->user_id = null;
        });
    }
}
