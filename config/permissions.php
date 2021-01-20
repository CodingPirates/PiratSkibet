<?php

use App\Support\Enums\CustomPermissions;
use App\Support\Enums\UserRoles;

return [

    /*
    |--------------------------------------------------------------------------
    | Roles
    |--------------------------------------------------------------------------
    |
    | Register your roles here
    |
    */

    'roles' => [
        UserRoles::ADMIN,
        UserRoles::LANDLUBBER,
        UserRoles::PIRATE,
        UserRoles::MENTOR,
        UserRoles::MODERATOR,
    ],

    /*
    |--------------------------------------------------------------------------
    | Moderation Weight
    |--------------------------------------------------------------------------
    |
    | Each roles moderating "weight" (how important is a report)
    |
    */

    'moderation' => [
        'suspension_time' => env('SUSPENSION_TIME', 12), // HOURS
        'threshold'       => env('MODERATION_THRESHOLD', 5),
        'weight'          => [
            UserRoles::ADMIN      => env('ADMIN_WEIGHT', 5),
            UserRoles::MODERATOR  => env('MODERATOR_WEIGHT', 5),
            UserRoles::MENTOR     => env('MENTOR_WEIGHT', 3),
            UserRoles::PIRATE     => env('PIRATE_WEIGHT', 1),
            UserRoles::LANDLUBBER => env('PIRATE_WEIGHT', 0),
        ],
    ],


    /*
    |--------------------------------------------------------------------------
    | Super Admin
    |--------------------------------------------------------------------------
    |
    | Super admins automatically get complete access.
    | If you don't want any roles to have this kind of power,
    | Just leave the array empty.
    |
    | Keep in mind a super_admin doesn't need any permissions,
    | So they don't need to be included in permission_roles.
    |
    */

    'super_admin' => [
        //UserRoles::ADMIN,
    ],


    /*
    |--------------------------------------------------------------------------
    | Permission roles
    |--------------------------------------------------------------------------
    |
    | List all roles you want seeded for each permission here.
    |
    */

    'permission_roles' => [
        'api' => [
            'user'         => [
                'index'              => [],
                'read'               => UserRoles::everybody(),
                'store'              => UserRoles::everybody(),
                'delete'             => UserRoles::everybody(),
                'edit_notifications' => UserRoles::everybody(),
                'flag'               => UserRoles::everybody(),
                'accept_pirate_vows' => [UserRoles::LANDLUBBER],
            ],
            'user_avatar'  => [
                'index'  => [],
                'read'   => UserRoles::everybody(),
                'store'  => UserRoles::everybody(),
                'delete' => [],
            ],
            'notification' => [
                'index'      => UserRoles::everybody(),
                'read'       => [],
                'store'      => [],
                'delete'     => [],
                'markAsRead' => UserRoles::everybody(),
                'count'      => UserRoles::everybody(),
            ],
            'rewards'      => [
                'user_reward' => [
                    'index' => UserRoles::everybody(),
                    'open'  => UserRoles::everybody(),
                ],
                'badge'       => [
                ],
                'user_title'  => [
                    'select' => UserRoles::everybody(),
                ],
            ],
            'projects'     => [
                'project' => [
                    'create'         => UserRoles::active(),
                    'store'          => UserRoles::active(),
                    'delete'         => UserRoles::active(),
                    'like'           => UserRoles::active(),
                    'flag'           => UserRoles::active(),
                    'endorse'        => UserRoles::facilitators(),
                    'resolve_invite' => UserRoles::everybody(),
                ],
            ],
            'courses' => [
                'courses' => [
                    'make_progress' => UserRoles::everybody(),
                ],
            ],
            'forum'        => [
                'thread'  => [
                    'create'          => UserRoles::active(),
                    'send'            => UserRoles::active(),
                    'toggle_mute'     => UserRoles::active(),
                    'toggle_sticky'   => UserRoles::admins(),
                    'flag'            => UserRoles::active(),
                    'request_removal' => UserRoles::active(),
                ],
                'message' => [
                    'store'           => UserRoles::everybody(),
                    'delete'          => UserRoles::everybody(),
                    'accept'          => UserRoles::active(),
                    'flag'            => UserRoles::active(),
                    'like'            => UserRoles::everybody(),
                    'endorse'         => UserRoles::facilitators(),
                    'request_removal' => UserRoles::active(),
                ],
            ],
            'filepond'     => [
                'process' => UserRoles::everybody(),
                'revert'  => UserRoles::everybody(),
                'load'    => UserRoles::everybody(),
            ],

            'backend' => [
                'gamification' => UserRoles::admins(),
                'users'        => [
                    'backend_user' => UserRoles::admins(),
                    'user'         => UserRoles::facilitators(),
                    'contact'      => UserRoles::admins(),
                ],
                'regions'      => UserRoles::admins(),
                'contact'      => UserRoles::admins(),
                'moderation'   => UserRoles::moderators(),
                'projects'     => UserRoles::moderators(),
                'content'      => UserRoles::admins(),
                'forum'        => UserRoles::admins(),
                'courses'      => UserRoles::admins(),

            ],
        ],

        'app' => [
            'projects' => [
                'download' => UserRoles::everybody(),
            ]
        ],

        'backend' => [
            'home'         => UserRoles::backend(),
            'users'        => [
                'pirates' => [
                    'index'    => UserRoles::facilitators(),
                    'create'   => UserRoles::admins(),
                    'download' => UserRoles::admins(),
                    'edit'     => UserRoles::facilitators(),
                ],
                'backend' => UserRoles::admins(),
            ],
            'contact'      => UserRoles::admins(),
            'moderation'   => UserRoles::moderators(),
            'projects'     => UserRoles::moderators(),
            'content'      => UserRoles::admins(),
            'forum'        => UserRoles::admins(),
            'courses'      => UserRoles::admins(),
            'gamification' => UserRoles::admins(),
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | Custom permission roles
    |--------------------------------------------------------------------------
    |
    | Here you can define some custom permissions,
    | Which don't need to be based on a Resource.
    | List all roles you want seeded for each custom permission here.
    |
    */

    'custom_permission_roles' => [
        CustomPermissions::MANAGE_PROJECT_MEMBERS => UserRoles::everybody(),
        CustomPermissions::UPGRADE_TO_PIRATE      => [UserRoles::LANDLUBBER],
    ],

];
