<?php

namespace App\Resources\Api\Backend\Moderation;

use App\Models\Moderation\ModerationAction as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class ModerationAction extends Resource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->appends(['label'])
                ->view(['with' => ['user:id,username', 'case:id,moderateable_type']]),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->when('moderation_case', function (Builder $q, $case) {
                return $q->forCase($case);
            }),

            Order::create()
                ->scopes(['newestFirst', 'oldestFirst'])
                ->defaultValue('newestFirst'),

            Pagination::create(),
        ];
    }

}
