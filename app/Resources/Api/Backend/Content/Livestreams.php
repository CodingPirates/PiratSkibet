<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\Livestream as Model;
use App\Support\Enums\Boolean;
use App\Support\Enums\LivestreamTypes;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\SelectFilter;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Livestreams extends CrudResource
{
    protected $model = Model::class;

    protected function getFields()
    {
        return [
            EnumField::create('type')->from(LivestreamTypes::class)->required(),
            Field::create('livestream_id')->validates(
                'required|string|max:191'
            ),
            Field::create('is_live')->validates('required|boolean'),
        ];
    }

    protected function getFilters()
    {
        return [
            SelectFilter::create('is_live')
                ->placeholder('Vis alle')
                ->options(
                    [
                        Boolean::YES => 'Vis kun Live',
                        Boolean::NO  => 'Vis ikke Live',
                    ]
                ),

            EnumFilter::create(LivestreamTypes::class, 'type')
                ->placeholder('Vælg type', LivestreamTypes::all()),

            Order::create()->only(
                [
                    'is_live',
                    'type',
                    'created_at',
                ]
            )->defaultValue(['created_at' => 'desc']),

            Pagination::create(),
        ];
    }
}
