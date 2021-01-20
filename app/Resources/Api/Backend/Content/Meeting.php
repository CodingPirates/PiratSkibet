<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\Meeting as Model;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Meeting extends CrudResource
{
    protected $model = Model::class;

    protected function getFields()
    {
        return [
            Field::create('description')->validates('required|string|max:191'),
            Field::create('meeting_room')->validates('required|string|max:191'),
            Field::create('banner_active')->validates('required|boolean'),
            Field::create('meeting_active')->validates('required|boolean'),
            Field::create('from')->validates('required|date_format:H:i:s'),
            Field::create('to')->validates('required|date_format:H:i:s'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'description',
                'meeting_room',
            ]),
            Order::create()
                ->only([
                    'description',
                    'meeting_room',
                    'banner_active',
                    'meeting_active',
                    'from',
                    'to',
                ])
                ->defaultValue(['is_active' => 'desc']),
            Pagination::create(),
        ];
    }
}
