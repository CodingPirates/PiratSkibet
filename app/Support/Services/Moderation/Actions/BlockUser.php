<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;

class BlockUser extends Action
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
        $recursive = false;
        $user      = $this->case->user;

        if (isset($args[0]) && isset($args[0]['recursive'])) {
            $recursive = filter_var($args[0]['recursive'], FILTER_VALIDATE_BOOLEAN);
        }

        if ($recursive) {
            $user->removeAllContent();
        }

        $this->meta = [
            'recursive' => $recursive,
        ];

        $user->delete();
    }

    protected function afterExecute(ModerationAction $log)
    {
        $this->case->performAsyncModeration(NotifyBlockedUser::class, null, $log);

        parent::afterExecute($log);
    }
}
