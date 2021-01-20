<?php

return [

    //////////////////////////
    /// User
    //////////////////////////

    \App\Models\User\User::class => [
        'specified'   => '{1}brugeren|[2,*]brugerne',
        'unspecified' => '{1}bruger|[0,2,*]brugere',
    ],

    \App\Models\Avatar\UserAvatar::class => [
        'specified'   => '{1}avataren|[2,*]avatarsne',
        'unspecified' => '{1}avatar|[0,2,*]avatars',
    ],

    \App\Models\Avatar\AvatarItem::class => [
        'specified'   => '{1}avatar elementet|[2,*]avatar elementerne',
        'unspecified' => '{1}avatar element|[0,2,*]avatar elementer',
    ],

    \App\Models\Rewards\Badge::class => [
        'specified'   => '{1}badget|[2,*]???????', // TODO
        'unspecified' => '{1}badge|[0,2,*]badges',
    ],

    \App\Models\Rewards\UserTitle::class => [
        'specified'   => '{1}bruger titlen|[2,*]bruger titlerne',
        'unspecified' => '{1}bruger titel|[0,2,*]bruger titler',
    ],


    //////////////////////////
    /// Forum
    //////////////////////////

    \App\Models\Forum\Message::class => [
        'specified'   => '{1}beskeden|[2,*]beskederne',
        'unspecified' => '{1}besked|[0,2,*]beskeder',
    ],

    \App\Models\Forum\Thread::class => [
        'specified'   => '{1}chat|[2,*]chats',
        'unspecified' => '{1}chat|[0,2,*]chats',
    ],

    \App\Models\Forum\Topic::class => [
        'specified'   => '{1}emmnet|[2,*]emmnerne',
        'unspecified' => '{1}emmne|[0,2,*]emmner',
    ],


    //////////////////////////
    /// Content
    //////////////////////////

    \App\Models\News::class => [
        'specified'   => '{1}nyheden|[2,*]nyhederne',
        'unspecified' => '{1}nyhed|[0,2,*]nyheder',
    ],

    \App\Models\Events\Event::class => [
        'specified'   => '{1}begivenheden|[2,*]begivenhederne',
        'unspecified' => '{1}begivenhed|[0,2,*]begivenheder',
    ],

    \App\Models\Content\TwitchChannel::class => [
        'specified'   => '{1}twitch kanalen|[2,*]twitch kanalerne',
        'unspecified' => '{1}twitch kanal|[0,2,*]twitch kanaler',
    ],

    \App\Models\Content\Meeting::class => [
        'specified'   => '{1}mødet|[2,*]møderne',
        'unspecified' => '{1}møde|[0,2,*]møder',
    ],

    \App\Models\Content\AnimatedTickerText::class => [
        'specified'   => '{1}ticker teksten|[2,*]ticker teksterne',
        'unspecified' => '{1}ticker tekst|[0,2,*]ticker tekster',
    ],

    \App\Models\Content\Post::class => [
        'specified'   => '{1}siden|[2,*]siderne',
        'unspecified' => '{1}side|[0,2,*]sider',
    ],


    //////////////////////////
    /// Courses
    //////////////////////////

    \App\Models\Course\CourseCategory::class => [
        'specified'   => '{1}kategorien|[2,*]kategorierne',
        'unspecified' => '{1}kategori|[0,2,*]kategorier',
    ],

    \App\Models\Course\Course::class => [
        'specified'   => '{1}læringsforløbet|[2,*]læringsforløbende',
        'unspecified' => '[*]læringsforløb',
    ],


    //////////////////////////
    /// Showcase
    //////////////////////////

    \App\Models\Projects\Project::class => [
        'specified'   => '{1}projektet|[2,*]projekterne',
        'unspecified' => '{1}projekt|[0,2,*]projekter',
    ],

    \App\Models\Projects\Category::class => [
        'specified'   => '{1}kategorien|[2,*]kategorierne',
        'unspecified' => '{1}kategori|[0,2,*]kategorier',
    ],


    //////////////////////////
    /// Moderation
    //////////////////////////

    \App\Models\Moderation\UserSuspension::class => [
        'specified'   => '{1}suspenderingen|[2,*]suspenderingerne',
        'unspecified' => '{1}suspendering|[0,2,*]suspenderinger',
    ],


    //////////////////////////
    /// Achievements
    //////////////////////////

    \App\Models\Achievements\Achievement::class => [
        'specified'   => '{1}achievement|[2,*]achievements',
        'unspecified' => '{1}achievement|[0,2,*]achievements',
    ],

];
