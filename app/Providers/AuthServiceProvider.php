<?php

namespace App\Providers;

use App\Models\Avatar\UserAvatar;
use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Models\Projects\Project;
use App\Models\User\User;
use App\Policies\ForumMessagePolicy;
use App\Policies\ForumThreadPolicy;
use App\Policies\NotificaionPolicy;
use App\Policies\ProjectPolicy;
use App\Policies\UserAvatarPolicy;
use App\Policies\UserPolicy;
use App\Support\Facades\Shutdown;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Notifications\DatabaseNotification;
use PermissionsService;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        User::class                 => UserPolicy::class,
        UserAvatar::class           => UserAvatarPolicy::class,
        DatabaseNotification::class => NotificaionPolicy::class,
        Message::class              => ForumMessagePolicy::class,
        Project::class              => ProjectPolicy::class,
        Thread::class               => ForumThreadPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {

        if (Shutdown::isWithinShutdownPeriod()) {
            // TODO
//            Gate::before(function (User $user, $permission) {
//                if (Shutdown::isDeniedAccess($user, $permission)) {
//                    return false;
//                }
//            });
        }

        PermissionsService::registerPolicies($this->policies);
    }
}
