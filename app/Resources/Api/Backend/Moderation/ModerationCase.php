<?php

namespace App\Resources\Api\Backend\Moderation;

use App\Models\Moderation\ModerationCase as Model;
use App\Operations\Moderation\Moderate;
use App\Support\Enums\Models;
use App\Support\Enums\ModerationCaseStatus;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class ModerationCase extends Resource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->view(['with' => ['user:id,username']]),

            Read::create()
                ->model($this->model)
                ->view(['with' => ['user', 'moderateable']])
                ->appends(['manual_moderation_actions']),

            Moderate::create(),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->withCount('requests');
                $q->withLastRequestedAt();
            }),

            Search::create()->search([
                'user' => ['username', 'name', 'email', 'parent_email'],
            ]),

            Filter::create()->when('user', function (Builder $q, $user) {
                return $q->forUser($user);
            }),

            Filter::create()->when('exclude', function (Builder $q, $ids) {
                return $q->exclude($ids);
            }),

            EnumFilter::create(Models::class, 'moderateable_type')
                ->placeholder('Vælg type', Models::all()),

            EnumFilter::create(ModerationCaseStatus::class, 'status')
                ->default('status', ModerationCaseStatus::PENDING)
                ->placeholder('Vælg status', ModerationCaseStatus::all()),

            Order::create()
                ->only(['last_requested_at', 'status', 'moderateable_type', 'requests_count'])
                ->scopes(['orderByUsername'])
                ->defaultValue(['last_requested_at' => 'desc']),

            Pagination::create(),
        ];
    }

}
