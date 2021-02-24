<?php

use App\Support\Enums\LandlubberRequirements;
use App\Support\Enums\Models;
use App\Support\Enums\ModerationReasons;
use App\Support\Enums\Rewardable;

return [

    'generic_status' => [
        \App\Support\Enums\GenericStatus::PUBLISHED => 'udgivet',
        \App\Support\Enums\GenericStatus::DRAFT     => 'kladde',
    ],

    'visible_status' => [
        \App\Support\Enums\VisibleStatus::VISIBLE => 'synlig',
        \App\Support\Enums\VisibleStatus::HIDDEN  => 'skjult',
    ],

    'generic_order_type' => [
        \App\Support\Enums\GenericOrderType::MOST_POPULAR  => 'Mest populære',
        \App\Support\Enums\GenericOrderType::LEAST_POPULAR => 'Mindst populære',
        \App\Support\Enums\GenericOrderType::LATEST        => 'Nyeste',
        \App\Support\Enums\GenericOrderType::OLDEST        => 'Ældste',
    ],

    'event_status' => [
        \App\Support\Enums\EventStatus::DRAFT     => 'kladde',
        \App\Support\Enums\EventStatus::PUBLISHED => 'udgivet',
        \App\Support\Enums\EventStatus::ARCHIVED  => 'arkiveret',
    ],

    'theme' => [
        \App\Support\Enums\Theme::YELLOW_PINK  => 'gul og pink',
        \App\Support\Enums\Theme::YELLOW_BLACK => 'gul og sort',

        \App\Support\Enums\Theme::BLUE_YELLOW => 'blå og gul',
        \App\Support\Enums\Theme::BLUE_BLACK  => 'blå og sort',

        \App\Support\Enums\Theme::PINK_YELLOW => 'pink og gul',
        \App\Support\Enums\Theme::PINK_BLACK  => 'pink og sort',

        \App\Support\Enums\Theme::GREY_BLUE  => 'grå og blå',
        \App\Support\Enums\Theme::GREY_PINK  => 'grå og pink',
        \App\Support\Enums\Theme::GREY_BLACK => 'grå og sort',
    ],

    'resource_types' => [
        \App\Support\Enums\ResourceTypes::STEP          => 'dyk',
        \App\Support\Enums\ResourceTypes::QUESTIONNAIRE => 'spørgeskema',
        \App\Support\Enums\ResourceTypes::VIDEO         => 'video',
        \App\Support\Enums\ResourceTypes::TEXT          => 'tekst',
    ],

    'basic_resource_types' => [
        \App\Support\Enums\BasicResourceTypes::QUESTIONNAIRE => 'spørgeskema',
        \App\Support\Enums\BasicResourceTypes::VIDEO         => 'video',
        \App\Support\Enums\BasicResourceTypes::TEXT          => 'tekst',
    ],

    'difficulty_levels' => [
        \App\Support\Enums\DifficultyLevels::EASY   => 'nem',
        \App\Support\Enums\DifficultyLevels::MEDIUM => 'middel',
        \App\Support\Enums\DifficultyLevels::HARD   => 'svær',
    ],

    'avatar_category' => [
        \App\Support\Enums\AvatarCategory::ACCESSORIES => 'Pynt',
        \App\Support\Enums\AvatarCategory::BODY        => 'Krop',
        \App\Support\Enums\AvatarCategory::HAT         => 'Hat',
        \App\Support\Enums\AvatarCategory::EYES        => 'Øjne',
        \App\Support\Enums\AvatarCategory::MOUTH       => 'Mund',
        \App\Support\Enums\AvatarCategory::LEGS        => 'Ben',
        \App\Support\Enums\AvatarCategory::ARMS        => 'Arme',
    ],

    'selectable_avatar_category' => [
        \App\Support\Enums\SelectableAvatarCategory::ACCESSORIES => 'Pynt',
        \App\Support\Enums\SelectableAvatarCategory::BODY        => 'Krop',
        \App\Support\Enums\SelectableAvatarCategory::HAT         => 'Hat',
        \App\Support\Enums\SelectableAvatarCategory::EYES        => 'Øjne',
        \App\Support\Enums\SelectableAvatarCategory::MOUTH       => 'Mund',
    ],

    'notification_type' => [
        \App\Support\Enums\NotificationType::WEEKLY_NEWSLETTER => 'Nyt fra Piratskibet',
        \App\Support\Enums\NotificationType::FORUM_NEW_COMMENT => 'Ny forum kommentar på din tråd.',
        \App\Support\Enums\NotificationType::FORUM_REACTION    => 'Nogen har liket din kommentar.',
        \App\Support\Enums\NotificationType::FORUM_MENTIONED   => 'Du er blevet tagget i en kommentar.',
    ],

    'moderation_reasons' => [
        ModerationReasons::SPAM               => 'Spam, salg eller reklamer',
        ModerationReasons::MALICIOUS_CONTENT  => 'Mistænksomme eller skadelige filer/links',
        ModerationReasons::DOXING             => 'Udgiver personlig eller fortrolig information',
        ModerationReasons::IMPERSONATION      => 'Udgiver sig for at være en anden person',
        ModerationReasons::DISTURBING_CONTENT => 'Nøgenhed, vold eller mishandling',
        ModerationReasons::DISCRIMINATORY     => 'Groft sprog, mobning eller diskrimination',
        ModerationReasons::THREATENING        => 'Trusler mod sig selv eller andre',
        ModerationReasons::INFRINGING         => 'Forbryder sig mod mine rettigheder',
        ModerationReasons::OTHER              => 'Andet',
        ModerationReasons::REMOVAL_REQUEST    => 'Anmodning om sletning',
    ],

    'moderation_case_status' => [
        \App\Support\Enums\ModerationCaseStatus::PENDING                 => 'igangværende',
        \App\Support\Enums\ModerationCaseStatus::MODERATED               => 'modereret',
        \App\Support\Enums\ModerationCaseStatus::AUTOMATICALLY_MODERATED => 'modereret automatisk',
        \App\Support\Enums\ModerationCaseStatus::REJECTED                => 'afvist',
    ],

    'moderation_actions' => [
        // Common
        \App\Support\Enums\ModerationActions::OPEN => [
            'action' => 'Opret sagen',
            'log'    => 'Sagen blev oprettet',
        ],

        \App\Support\Enums\ModerationActions::RESOLVE => [
            'action' => 'Løs sagen',
            'log'    => 'Sagen blev løst',
        ],

        \App\Support\Enums\ModerationActions::MODERATE_AUTOMATICALLY => [
            'action' => 'Moderere automatisk',
            'log'    => 'Modereret automatisk',
        ],

        \App\Support\Enums\ModerationActions::REJECT => [
            'action' => 'Afvis sagen',
            'log'    => 'Sagen blev afvist',
        ],

        \App\Support\Enums\ModerationActions::COMMENT => [
            'action' => 'Skriv en kommentar',
            'log'    => 'Kommentar til sagen',
        ],

        \App\Support\Enums\ModerationActions::BLOCK_USER => [
            'action' => 'Bloker brugeren',
            'log'    => 'Brugeren blev blokeret',
        ],

        \App\Support\Enums\ModerationActions::SUSPEND_USER => [
            'action' => 'Lås brugeren',
            'log'    => 'Brugeren blev låst',
        ],

        \App\Support\Enums\ModerationActions::APPEAL => [
            'action' => 'Appelere sagen',
            'log'    => 'Brugeren har appeleret',
        ],

        \App\Support\Enums\ModerationActions::NOTIFY_BLOCKED_USER    => [
            'action' => 'Underrett brugeren om blokering',
            'log'    => 'Brugeren blev underrettet om blokering',
        ],

        // Forum Message
        \App\Support\Enums\ModerationActions::REMOVE_MESSAGE_CONTENT => [
            'action' => 'Skjul besked indhold',
            'log'    => 'Besked indhold blev skjult',
        ],

        \App\Support\Enums\ModerationActions::DELETE => [
            'action' => 'Slet :moderateable permanent',
            'log'    => ':Moderateable blev permanent slettet',
        ],


        // Lockable (Forum Thread & Project)
        \App\Support\Enums\ModerationActions::LOCK_MODERATEABLE      => [
            'action' => 'Lås :moderateable',
            'log'    => ':Moderateable blev låst',
        ],

        \App\Support\Enums\ModerationActions::ARCHIVE_MODERATEABLE => [
            'action' => 'Arkiver :moderateable',
            'log'    => ':Moderateable blev arkiveret',
        ],

        \App\Support\Enums\ModerationActions::ACTIVATE_MODERATEABLE => [
            'action' => 'Aktiver :moderateable',
            'log'    => ':Moderateable blev aktiveret',
        ],

        \App\Support\Enums\ModerationActions::REMOVE_THREAD_MESSAGE_CONTENT => [
            'action' => 'Skjul besked indhold',
            'log'    => 'Besked indhold blev skjult',
        ],
    ],

    'models' => [
        Models::USER => trans_choice('models.' . Models::USER . '.unspecified', 1),
        Models::MESSAGE => trans_choice('models.' . Models::MESSAGE . '.unspecified', 1),
        Models::THREAD => trans_choice('models.' . Models::THREAD . '.unspecified', 1),
        Models::PROJECT => trans_choice('models.' . Models::PROJECT . '.unspecified', 1),
    ],

    'post_type' => [
         \App\Support\Enums\PostType::PAGE => 'Side',
         \App\Support\Enums\PostType::REVISION => 'Revision',
    ],

    'user_status' => [
        \App\Support\Enums\UserStatus::ACTIVE  => 'aktive',
        \App\Support\Enums\UserStatus::BLOCKED => 'blokerede',
    ],

    'contact_submission_type' => [
        \App\Support\Enums\ContactSubmissionType::GDPR      => 'GDPR',
        \App\Support\Enums\ContactSubmissionType::GENERIC   => 'generisk',
        \App\Support\Enums\ContactSubmissionType::COPYRIGHT => 'copyright ',
    ],

    'boolean' => [
        \App\Support\Enums\Boolean::YES => 'ja',
        \App\Support\Enums\Boolean::NO  => 'nej',
    ],

    'rewardable' => [
        Rewardable::USER_TITLE  => trans_choice('models.' . Rewardable::USER_TITLE . '.unspecified', 1),
        Rewardable::AVATAR_ITEM => trans_choice('models.' . Rewardable::AVATAR_ITEM . '.unspecified', 1),
    ],

    'landlubber_requirements' => [
        LandlubberRequirements::ACCEPTED_PIRATE_VOWS => 'Du skal læse og acceptere piratløfterne.',
        LandlubberRequirements::PARENT_EMAIL         => 'Du skal udfylde dine forældres email.',
        LandlubberRequirements::EMAIL_VERIFIED_AT    => 'Dine forældre skal bekræfte deres email. (udføres af forældre)',
        LandlubberRequirements::BIRTHDAY             => 'Du skal udfylde din fødselsdag. (udføres af forældre)',
        LandlubberRequirements::ZIPCODE              => 'Du skal udfylde dit postnummer. (udføres af forældre)',
    ],

    'user_roles' => [
        \App\Support\Enums\UserRoles::ADMIN => 'Administrator',
        \App\Support\Enums\UserRoles::LANDLUBBER => 'Landkrabbe',
        \App\Support\Enums\UserRoles::PIRATE => 'Pirat',
        \App\Support\Enums\UserRoles::MENTOR => 'Mentor',
        \App\Support\Enums\UserRoles::MODERATOR => 'Moderator',
    ],

    'livestream_types' => [
        \App\Support\Enums\LivestreamTypes::YOUTUBE         => 'Youtube',
        \App\Support\Enums\LivestreamTypes::YOUTUBE_CHANNEL => 'Youtube Kanal',
    ],

];
