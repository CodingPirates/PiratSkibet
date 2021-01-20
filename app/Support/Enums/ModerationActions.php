<?php

namespace App\Support\Enums;


use App\Support\Services\Moderation\Actions\ActivateModerateable;
use App\Support\Services\Moderation\Actions\Appeal;
use App\Support\Services\Moderation\Actions\ArchiveModerateable;
use App\Support\Services\Moderation\Actions\BlockUser;
use App\Support\Services\Moderation\Actions\Comment;
use App\Support\Services\Moderation\Actions\Delete;
use App\Support\Services\Moderation\Actions\LockModerateable;
use App\Support\Services\Moderation\Actions\ModerateAutomatically;
use App\Support\Services\Moderation\Actions\NotifyBlockedUser;
use App\Support\Services\Moderation\Actions\Open;
use App\Support\Services\Moderation\Actions\Reject;
use App\Support\Services\Moderation\Actions\RemoveMessageContent;
use App\Support\Services\Moderation\Actions\RemoveThreadMessageContent;
use App\Support\Services\Moderation\Actions\Resolve;
use App\Support\Services\Moderation\Actions\SuspendUser;

class ModerationActions extends ExportableEnum
{
    public static $export = true;

    // System
    CONST OPEN                   = Open::class;
    CONST RESOLVE                = Resolve::class;
    CONST MODERATE_AUTOMATICALLY = ModerateAutomatically::class;
    CONST APPEAL                 = Appeal::class;

    // Common
    CONST REJECT              = Reject::class;
    CONST COMMENT             = Comment::class;
    CONST BLOCK_USER          = BlockUser::class;
    CONST SUSPEND_USER        = SuspendUser::class;
    CONST NOTIFY_BLOCKED_USER = NotifyBlockedUser::class;

    // Forum Message
    CONST REMOVE_MESSAGE_CONTENT = RemoveMessageContent::class;
    CONST DELETE                 = Delete::class;

    // Lockable (Forum Thread & Project)
    CONST LOCK_MODERATEABLE             = LockModerateable::class;
    CONST ARCHIVE_MODERATEABLE          = ArchiveModerateable::class;
    CONST ACTIVATE_MODERATEABLE         = ActivateModerateable::class;
    CONST REMOVE_THREAD_MESSAGE_CONTENT = RemoveThreadMessageContent::class;
}
