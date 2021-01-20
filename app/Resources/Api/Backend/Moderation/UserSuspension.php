<?php

namespace App\Resources\Api\Backend\Moderation;

use App\Models\Moderation\UserSuspension as Model;
use App\Operations\Action;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class UserSuspension extends Resource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->view(['with' => ['user:id,username', 'issuer:id,username']]),

            Read::create()
                ->model($this->model)
                ->view(['with' => ['user', 'issuer:id,username']]),

            'deactivate' => Action::create()
                ->model($this->model)
                ->trigger('deactivate'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'user' => ['username', 'name', 'email', 'parent_email'],
            ]),

            Filter::create()->when('user',
                function (Builder $q, $user) {
                    return $q->forUser($user);
                }),

            Filter::create()->when('active',
                function (Builder $q) {
                    return $q->active();
                }),

            Order::create()
                ->only(['created_at', 'start_at', 'end_at'])
                ->scopes(['orderByUsername', 'orderByDuration'])
                ->defaultValue(['created_at' => 'desc']),

            Pagination::create(),
        ];
    }

}
