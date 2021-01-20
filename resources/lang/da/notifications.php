<?php

return [
    \App\Support\Enums\NotificationType::FORUM_NEW_COMMENT => [
        'title' => 'Ny kommentar på din tråd.',
        'msg'   => 'Der er :count ny kommentar på din tråd.|Der er :count nye kommetar på din tråd.',
    ],

    \App\Support\Enums\NotificationType::FORUM_MENTIONED => [
        'title' => ':user har tagget dig i en :message.',
        'msg'   => ':user har tagget dig i en :message.',
    ],

    \App\Support\Enums\NotificationType::FORUM_REACTION => [
        'title' => ':user har liket din :message.',
        'msg'   => '{0} :user har liket din :message.|{1} :user og 1 anden har liket din :message.|[2,*] :user og :count andre har liket din :message.',
    ],

    \App\Support\Enums\NotificationType::FORUM_ENDORSEMENT => [
        'title' => 'Din :message er blevet fremhævet.',
        'msg'   => 'Din :message er blevet fremhævet. Tillykke!',
    ],

    \App\Support\Enums\NotificationType::EVENT_REMINDER => [
        'title' => 'Et kommende event i dit område begynder snart.',
        'msg'   => 'Eventet ":event" begynder :start i nærheden af dig.',
    ],

    \App\Support\Enums\NotificationType::MODERATION_NEW_REQUEST => [
        'title' => 'Ny moderations anmeldelse på en :moderateable.',
        'msg'   => '{0} :user har rapporteret en :moderateable.|{1} :user og 1 anden har rapporteret en :moderateable.|[2,*] :user og :count andre har rapporteret en :moderateable.',
    ],

    \App\Support\Enums\NotificationType::USER_REWARD_GRANTED => [
        'title' => 'Du har fået en ny skattekiste!',
        'msg'   => 'Du har en uåbnet skattekiste. Skynd dig og se hvad der gemmer sig i den.|Du har :count uåbnet skattekister. Skynd dig og se hvad der gemmer sig i dem.',
    ],

    \App\Support\Enums\NotificationType::PROJECT_INVITATION => [
        'title' => 'Du er blevet inviteret til et projekt!',
        'msg'   => ':owner har inviteret dig til at samarbejde på deres projekt ":Project".',
    ],

    \App\Support\Enums\NotificationType::PROJECT_REACTION => [
        'title' => ':user har liket dit :project.',
        'msg'   => '{0} :user har liket dit :project.|{1} :user og 1 anden har liket dit :project.|[2,*] :user og :count andre har liket dit :project.',
    ],

    \App\Support\Enums\NotificationType::PROJECT_ENDORSEMENT => [
        'title' => 'Dit :project er blevet fremhævet.',
        'msg'   => 'Dit :project ":Title" er blevet fremhævet. Tillykke!',
    ],

    \App\Support\Enums\NotificationType::SYSTEM_NEW_CONTACT_SUBMISSION => [
        'title' => 'Ny kontakthenvendelse!',
        'msg'   => 'Der er en ny kontakthenvendelse af typen ":SubmissionType".',
    ],
];
