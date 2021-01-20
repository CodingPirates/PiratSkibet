<?php

namespace App\Support\Traits\Moderation;


use App\Support\Enums\ModerationActions;

trait HasModerationActions
{

    /**
     * Return an array of moderation action classes, possible to perform on the Moderateable
     *
     * @return array
     */
    public function getModerationActionsAttribute(): array
    {
        return static::getCommonModerationActions();
    }

    protected function getCustomAutomaticResolutionActions(bool $willSuspendUser): array
    {
        return [];
    }

    final public function getAutomaticResolutionActions(bool $suspendUser = true): array
    {
        $actions= $this->getCustomAutomaticResolutionActions($suspendUser);

        if ($suspendUser) {
            $actions = array_merge($actions, [
                ModerationActions::SUSPEND_USER => [
                    now(),
                    now()->addHours(config('permissions.moderation.suspension_time', 12)),
                ],
            ]);
        }

        return $actions;
    }

    /**
     * Default ModerationActions
     *
     * @return array
     */
    protected static function getCommonModerationActions(): array
    {
        return [
            ModerationActions::OPEN,
            ModerationActions::RESOLVE,
            ModerationActions::MODERATE_AUTOMATICALLY,
            ModerationActions::REJECT,
            ModerationActions::COMMENT,
            ModerationActions::BLOCK_USER,
            ModerationActions::SUSPEND_USER,
            ModerationActions::APPEAL,
            ModerationActions::NOTIFY_BLOCKED_USER,
        ];
    }

}
