<?php

namespace App\Support\Contracts;


interface Moderateable
{
    /**
     * Return the id of the \App\Models\User\User responsible for the Moderateable entity
     *
     * @return int
     */
    public function getResponsibleUserId(): int;

    /**
     * Create the \App\Models\Moderation\ModerationRequest
     *
     * @param string $reason
     * @param string $comment
     */
    public function flag(string $reason, string $comment): void;

    /**
     * Return an array of moderation action classes, possible to perform on the Moderateable
     *
     * @return array
     */
    public function getModerationActionsAttribute(): array;

    /**
     * Return an array of actions which should run on automatic resolution
     *
     * @param bool $suspendUser
     * @return array
     */
    public function getAutomaticResolutionActions(bool $suspendUser = true): array;
}
