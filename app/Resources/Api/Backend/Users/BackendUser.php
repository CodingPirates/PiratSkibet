<?php

namespace App\Resources\Api\Backend\Users;

use App\Models\User\User as Model;
use MorningTrain\Laravel\Fields\Fields\Field;

class BackendUser extends User
{

    public function getFields()
    {

        return [
            Field::create('name')->validates('required|string|max:255'),

            Field::create('username')->validates(function (Model $user) {
                return join('|', [
                    'required',
                    'string',
                    'alpha_dash_dot',
                    'max:25',
                    'unique:reserved_usernames,username',
                    "unique:users,username,{$user->id}",
                ]);
            }),

            Field::create('email')->validates(function (Model $user) {
                return join('|', [
                    'required',
                    'string',
                    'email',
                    'max:255',
                    "unique:users,email,{$user->id}",
                ]);
            }),

            Field::create('role_name')
                ->updates(function ($user, $attribute, $value) {
                    $user->syncRoles($value);
                }),
        ];
    }

}
