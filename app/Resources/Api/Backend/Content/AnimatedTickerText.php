<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\AnimatedTickerText as Model;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class AnimatedTickerText extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('text')->validates('required|string|max:16'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'text',
            ]),

            Order::create()->only(['text']),

            Pagination::create(),
        ];
    }
}
