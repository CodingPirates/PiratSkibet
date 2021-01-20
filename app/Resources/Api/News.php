<?php

namespace App\Resources\Api;

use App\Models\News as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class News extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters()),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                return $q->isPublished();
            }),

            Order::create()
                ->only(['featured', 'publish_at'])
                ->defaultValue(['featured' => 'DESC', 'publish_at' => 'DESC']),

            Pagination::create()->shows(5),
        ];
    }

}
