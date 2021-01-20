<?php

namespace App\Support\Services\Moderation\Actions;


use App\Models\Moderation\ModerationAction;
use App\Support\Enums\ModerationActionType;
use App\Support\Enums\ModerationCaseStatus;
use App\Support\Services\Moderation\Abstracts\Action;

class Reject extends Action
{
    CONST TYPE = ModerationActionType::RESOLUTION;

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return void|mixed
     */
    protected function perform(...$args)
    {
        $this->case->status = ModerationCaseStatus::REJECTED;
        $this->case->save();

        $this->case->requests()
            ->resolved(false)
            ->update(['resolved_at' => now()]);
    }
}
