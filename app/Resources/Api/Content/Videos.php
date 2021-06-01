<?php

namespace App\Resources\Api\Content;

use App\Models\Content\Video as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Videos extends CrudResource
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
            Filter::create()->when('highlighted', function (Builder $q) {
                $q->highlighted(true);
            }),

            Filter::create()->when('category', function (Builder $q, int $category) {
                return $q->forCategory($category);
            }),

            Order::create()
                ->only(['created_at'])
                ->defaultValue(['created_at' => 'DESC']),

            Search::create()->search([
                'title',
                'description'
            ]),

            Pagination::create()->shows(5),
        ];
    }

}
