<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Resources
    |--------------------------------------------------------------------------
    |
    | Register your resources here
    |
    */


    'auth' => [
        \App\Resources\Auth\Login::class,
        \App\Resources\Auth\Register::class,
        \App\Resources\Auth\Password::class,
    ],

    'api' => [
        \App\Resources\Api\User::class,
        \App\Resources\Api\Contact::class,
        \App\Resources\Api\AvatarItem::class,
        \App\Resources\Api\UserAvatar::class,
        \App\Resources\Api\News::class,
        \App\Resources\Api\Event::class,
        \App\Resources\Api\Notification::class,
        \MorningTrain\Laravel\Fields\Files\Resources\Filepond::class,
        'courses' => [
            \App\Resources\Api\Courses\Courses::class,
            \App\Resources\Api\Courses\CourseResource::class,
            \App\Resources\Api\Courses\Category::class,
        ],
        'forum'   => [
            \App\Resources\Api\Forum\Message::class,
            \App\Resources\Api\Forum\Thread::class,
            \App\Resources\Api\Forum\Topics::class,
        ],
        'rewards' => [
            \App\Resources\Api\Rewards\UserReward::class,
            \App\Resources\Api\Rewards\UserTitle::class,
        ],
        'projects' => [
            \App\Resources\Api\Projects\Category::class,
            \App\Resources\Api\Projects\Project::class,
        ],
        'moderation' => [
            \App\Resources\Api\Moderation\Appeal::class,
        ],
        'content' => [
            \App\Resources\Api\Content\Posts::class,
            \App\Resources\Api\Content\Videos::class,
        ],

        'backend' => [
            'users'      => [
                \App\Resources\Api\Backend\Users\BackendUser::class,
                \App\Resources\Api\Backend\Users\User::class,
                \App\Resources\Api\Backend\Users\Contact::class,
            ],
            'forum'      => [
                \App\Resources\Api\Backend\Forum\Topic::class,
            ],
            'regions'    => [
                \App\Resources\Api\Backend\Regions\Region::class,
            ],
            'courses'    => [
                \App\Resources\Api\Backend\Courses\Category::class,
                \App\Resources\Api\Backend\Courses\Course::class,
            ],
            'projects' => [
                \App\Resources\Api\Backend\Projects\Category::class,
            ],
            'moderation' => [
                \App\Resources\Api\Backend\Moderation\ModerationCase::class,
                \App\Resources\Api\Backend\Moderation\ModerationAction::class,
                \App\Resources\Api\Backend\Moderation\ModerationRequest::class,
                \App\Resources\Api\Backend\Moderation\ModerationComment::class,
                \App\Resources\Api\Backend\Moderation\UserSuspension::class,
            ],
            'content' => [
                \App\Resources\Api\Backend\Content\Event::class,
                \App\Resources\Api\Backend\Content\News::class,
                \App\Resources\Api\Backend\Content\TwitchChannel::class,
                \App\Resources\Api\Backend\Content\Videos::class,
                \App\Resources\Api\Backend\Content\Meeting::class,
                \App\Resources\Api\Backend\Content\Posts::class,
            ],
            'gamification' => [
                \App\Resources\Api\Backend\Gamification\Achievement::class,
                \App\Resources\Api\Backend\Gamification\UserTitle::class,
                \App\Resources\Api\Backend\Gamification\AvatarItem::class,
                \App\Resources\Api\Backend\Gamification\User::class,
            ],
        ],

    ],

    'app' => [
        \App\Resources\App\Home::class,
        \App\Resources\App\Courses::class,
        \App\Resources\App\Forum::class,
        \App\Resources\App\Projects::class,
        \App\Resources\App\Test::class,
        \App\Resources\App\PasswordReset::class,
        \App\Resources\App\Tv::class,
        \App\Resources\App\Pirate::class,
        \App\Resources\App\Pages::class,
        \App\Resources\App\Appeal::class,
        \App\Resources\App\Submissions::class,
    ],

    'backend' => [
        \App\Resources\Backend\Login::class,
        'users' => [
            \App\Resources\Backend\Users\Pirates::class,
            \App\Resources\Backend\Users\Backend::class,
        ],
        \App\Resources\Backend\Courses::class,
        \App\Resources\Backend\Forum::class,
        \App\Resources\Backend\Projects::class,
        \App\Resources\Backend\Home::class,
        \App\Resources\Backend\Contact::class,
        \App\Resources\Backend\Moderation::class,
        'content' => [
            \App\Resources\Backend\Content\News::class,
            \App\Resources\Backend\Content\Events::class,
            \App\Resources\Backend\Content\TwitchChannels::class,
            \App\Resources\Backend\Content\Videos::class,
            \App\Resources\Backend\Content\Meetings::class,
            \App\Resources\Backend\Content\Posts::class,
        ],
        'gamification' => [
            \App\Resources\Backend\Gamification\Achievements::class,
            \App\Resources\Backend\Gamification\AvatarItems::class,
            \App\Resources\Backend\Gamification\UserTitles::class,
            \App\Resources\Backend\Gamification\Users::class,
        ],
    ],

];
