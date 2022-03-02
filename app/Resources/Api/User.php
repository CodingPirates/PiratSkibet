<?php

namespace App\Resources\Api;

use App\Models\User\User as Model;
use App\Operations\Moderation\RequestModeration;
use App\Support\Enums\UserRoles;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\ScopeFilter;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Operations\Crud\Validate;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class User extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return array_merge(parent::operations(),
            [
                'edit_notifications' => Store::create()
                    ->model($this->model)
                    ->fields($this->getNotificationFields()),

                Validate::create()
                    ->model($this->model)
                    ->fields($this->getFields()),

                'mentionables' => Index::create()
                    ->model($this->model)
                    ->filters(($this->getMentionableFilters())),

                'flag' => RequestModeration::create()
                    ->model($this->model),

                'pirate' => Index::create()
                    ->model($this->model)
                    ->filters([
                        Filter::create()
                            ->when('username', function ($q, $username) {
                                return $q->whereUsername($username);
                            })
                            ->missing('username', function () {
                                return abort(404);
                            })
                    ])
                    ->single(),

                'accept_pirate_vows' => Store::create()
                    ->model($this->model)
                    ->fields($this->getVowFields()),
            ]);
    }

    public function configureReadOperation(Read $operation)
    {
        $operation->appends(['notification_settings', 'zipcode']);
    }

    protected function getNotificationFields()
    {
        return [
            Field::create('notification_settings')
                ->validates('required|array')
                ->updates(function ($user, $attribute, $value) {
                    $settings = Arr::only($value, Model::editableNotifications());
                    $settings = array_map(function ($i) {
                        return (bool)$i;
                    }, $settings);

                    $user->setMeta('notification_settings', $settings, 'json');
                }),
        ];
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('required|string|max:255'),
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

            Field::create('parent_email')
                ->validates(function (Model $user) {
                    return $user->hasVerifiedEmail()
                        ? 'in:'.$user->parent_email
                        : 'nullable|string|email|different:email|max:255';
                }),

            Field::create('description')->validates('nullable|string'),
            Field::create('birthday')
                ->validates(function (Model $user) {
                    return ['birthday' => join('|', array_filter([
                        !empty($user->birthday) ? 'required' : 'nullable',
                        'date',
                        'before:today',
                    ]))];
                }),

            Field::create('zipcode')
                ->validates(function (Model $user) {
                    return ['zipcode' => join('|', array_filter([
                        !empty($user->zipcode) ? 'required' : 'nullable',
                        'integer',
                        'exists:zipcodes,zipcode',
                    ]))];
                })
                ->updates(function ($user, $attribute, $value) {
                    if (!empty($value)) {
                        $user->setMeta('zipcode', $value, 'int');
                    }
                }),

            Field::create('password')
                ->validates('nullable|string|min:8|confirmed')
                ->updates(function ($user, $attribute, $value) {
                    if (!empty($value)) {
                        $user->password = Hash::make($value);
                    }
                }),

            Field::create('current_password')
                ->validates(['current_password' => [
                    'nullable',
                    'required_with:password',
                    function ($attribute, $value, $fail) {
                        if (!Hash::check($value, Auth::user()->password)) {
                            $fail(trans('validation.invalid', [$attribute]));
                        }
                    },
                ]])
                ->updates(function () {}),
        ];
    }

    protected function getMentionableFilters()
    {
        return [
            Filter::create()->always(function ($builder) {

                /// Only allow mentioning of pirates
                $builder->role(UserRoles::active());

                /// Only display public user info
                $builder->select(['username', 'id', 'user_avatar_id']);

                /// Do not allow mention of yourself
                $builder->where('id', '<>', Auth::id());

            }),

            Filter::create()->when('query', function ($builder, $query) {
                $builder->where('username', 'like', '%' . $query . '%');
            }),

            Filter::create()->when('exclude', function ($q, $ids) {
                return $q->whereNotIn('id', (array)$ids);
            }),

        ];
    }

    protected function getCurrentFilters()
    {
        return [
            ScopeFilter::create()->always()->scope('currentUser'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search(['name', 'email', 'parent_email', 'username']),
            Pagination::create()
        ];
    }

    protected function getVowFields()
    {
        return [
            Field::create('vows')
                ->validates([
                    'vows'   => 'required|array|size:6',
                    'vows.*' => 'required|accepted',
                ])
                ->updates(function ($user, $attribute, $value) {
                    $user->setMeta('accepted_pirate_vows', $value, 'bool');
                }),
        ];
    }

}
