<?php

namespace App\Operations;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Resources\Operations\Auth\ResetPassword as ResetPasswordOperation;
use PermissionsService;

class ResetPassword extends ResetPasswordOperation
{
    protected function sendResetResponse(Request $request, $response)
    {
        $user        = Auth::user();
        $permissions = PermissionsService::getUserPermissions($user);
        $user->unsetRelation('roles'); // Removes duplicate data from response

        return array_merge(parent::sendResetResponse($request, $response), [
            'user_permissions' => $permissions,
        ]);
    }
}
