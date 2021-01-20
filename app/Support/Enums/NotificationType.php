<?php

namespace App\Support\Enums;


class NotificationType extends ExportableEnum
{
    public static $export = true;

    const SYSTEM_NEW_CONTACT_SUBMISSION = 'system_new_contact_submission';
    const WEEKLY_NEWSLETTER             = 'weekly_newsletter';

    // Forum
    CONST FORUM_MENTIONED   = 'forum_mentioned';
    CONST FORUM_REACTION    = 'forum_reaction';
    CONST FORUM_NEW_COMMENT = 'forum_new_comment';
    CONST FORUM_ENDORSEMENT = 'forum_endorsement';

    // Event
    CONST EVENT_REMINDER = 'event_reminder';

    // Moderation
    CONST MODERATION_NEW_REQUEST = 'moderation_new_request';

    // User
    CONST USER_REWARD_GRANTED = 'user_reward_granted ';

    // Projects
    CONST PROJECT_INVITATION  = 'project_invitation';
    CONST PROJECT_REACTION    = 'project_reaction';
    CONST PROJECT_ENDORSEMENT = 'project_endorsement';


    public static function getForumNotifications()
    {
        return [
            static::FORUM_MENTIONED,
            static::FORUM_REACTION,
            static::FORUM_NEW_COMMENT,
            static::FORUM_ENDORSEMENT,
        ];
    }
}
