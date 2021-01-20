<?php

namespace App\Operations;


use App\Models\User\User;
use MorningTrain\Laravel\Filters\Filters\ScopeFilter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use PermissionsService;

class Refresh extends Index
{
    public function __construct()
    {
        $this->model(User::class);
        $this->filters([
            ScopeFilter::create()->always()->scope('currentUser'),
        ]);
        $this->single();
    }

    public function handle($user = null)
    {
        $permissions = PermissionsService::getUserPermissions($user);

        if ($user !== null) {
            $user->unsetRelation('roles'); // Removes duplicate data from response
        }

        return [
            'user'             => $user,
            'csrf'             => csrf_token(),
            'user_permissions' => $permissions,
        ];
    }
}
