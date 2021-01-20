<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\TwitchChannel as Model;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class TwitchChannel extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('channel_name')->validates('required|string|max:191'),
            Field::create('collection')->validates('required|string|max:191'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'channel_name',
            ]),
            Pagination::create(),
        ];
    }
}
