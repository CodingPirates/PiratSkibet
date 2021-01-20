<?php

namespace App\Resources\Api\Backend\Moderation;

use App\Models\Moderation\ModerationRequest as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class ModerationRequest extends Resource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->view(['with' => ['reporter:id,username']]),

            Read::create()->model($this->model),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->when('moderation_case', function (Builder $q, $case) {
                return $q->forCase($case);
            }),

            Order::create()
                ->only(['created_at', 'reason'])
                ->scopes(['orderByUsername'])
                ->defaultValue(['created_at' => 'desc']),

            Pagination::create(),
        ];
    }

}
