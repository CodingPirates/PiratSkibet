<?php

namespace App\Support\Services\Moderation\Actions;


use App\Mail\Moderation\BlockedUserNotice;
use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;
use Illuminate\Support\Facades\Mail;

class NotifyBlockedUser extends Action
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
        $moderation_action = null;

        if (isset($args[0]) && $args[0] instanceof ModerationAction) {
            $moderation_action = $args[0];

            $this->meta = [
                'moderation_action_id' => $moderation_action->id,
            ];
        }

        $user = $this->case->user()->withTrashed()->firstOrFail();

        Mail::to($user->email)->send(new BlockedUserNotice($this->case, $user, optional($moderation_action)->note, false));

        if ($user->parent_email !== $user->email && $user->parent_email !== null) {
            Mail::to($user->parent_email)->send(new BlockedUserNotice($this->case, $user, optional($moderation_action)->note, true));
        }
    }
}
