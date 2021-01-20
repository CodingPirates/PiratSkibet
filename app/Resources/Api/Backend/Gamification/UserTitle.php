<?php

namespace App\Resources\Api\Backend\Gamification;

use App\Models\Rewards\UserTitle as Model;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class UserTitle extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:191'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'title',
            ]),

            Pagination::create(),
        ];
    }
}
