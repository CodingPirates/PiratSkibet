<?php

namespace App\Resources\Api\Backend\Users;

use App\Models\User\User as Model;
use App\Support\Enums\UserRoles;
use App\Support\Enums\UserStatus;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Action;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;
use MorningTrain\Laravel\Filters\Filters\Pagination;

class User extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return array_merge(parent::operations(), [
            'restore' => Action::create()
                ->model($this->model)
                ->filters($this->withTrashedFilter())
                ->trigger('restore'),
        ]);
    }

    protected function getFields()
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
                    'different:parent_email',
                    "unique:users,email,{$user->id}",
                ]);
            }),

            Field::create('parent_email')->validates('required|string|email|different:email|max:255'),
            Field::create('birthday')->validates('required|date|before:today'),
            Field::create('zipcode')
                ->validates('required|integer|exists:zipcodes,zipcode')
                ->updates(function ($user, $attribute, $value) {
                    $user->setMeta('zipcode', $value, 'int');
                }),
            Field::create('role_name')
                ->updates(function ($user, $attribute, $value) {
                    $user->syncRoles($value);
                }),
        ];
    }

    public function configureReadOperation(Read $operation)
    {
        $operation->filters($this->withTrashedFilter());
    }

    public function configureStoreOperation(Store $operation)
    {
        $operation->filters($this->withTrashedFilter());
    }

    protected function withTrashedFilter()
    {
        return [
            Filter::create()->always()->scope('withTrashed'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'name',
                'email',
                'parent_email',
                'username',
            ]),

            EnumFilter::create(UserStatus::class, 'status')
                ->default('status', UserStatus::ACTIVE)
                ->placeholder('Alle', UserStatus::all())
                ->scope('status'),

            EnumFilter::create(UserRoles::class, 'role')
                ->placeholder('Vælg rolle', UserRoles::all())
                ->scope('role'),

            Order::create()->only([
                'name',
                'email',
                'parent_email',
                'username',
                'birthday',
            ]),

            Pagination::create(),
        ];
    }

}
