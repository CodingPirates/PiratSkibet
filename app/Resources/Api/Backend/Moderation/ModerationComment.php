<?php

namespace App\Resources\Api\Backend\Moderation;


use App\Models\Moderation\ModerationAction as Model;
use App\Support\Enums\ModerationActionType;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class ModerationComment extends Resource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->view(['with' => ['user']]),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                return $q->type(ModerationActionType::COMMENT);
            }),

            Filter::create()->when('moderation_case', function (Builder $q, $case) {
                return $q->forCase($case);
            }),

            Order::create()
                ->scopes(['latest', 'oldest'])
                ->defaultValue('latest'),

            Pagination::create(),
        ];
    }

}
