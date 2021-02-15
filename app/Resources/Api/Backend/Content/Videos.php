<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\Video as Model;
use App\Support\Enums\Boolean;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\SelectFilter;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Videos extends CrudResource
{
    protected $model = Model::class;

    protected function getFields()
    {
        return [
            Field::create('video_id')->validates('required|string|max:191'),
            Field::create('is_highlighted')->validates('required|boolean'),
        ];
    }

    protected function getFilters()
    {
        return [
            SelectFilter::create('is_highlighted')
                ->placeholder('Vis alle')
                ->options(
                    [
                        Boolean::YES => 'Vis kun Highlighted',
                        Boolean::NO  => 'Vis ikke Highlighted',
                    ]
                ),

            Order::create()->only(
                [
                    'is_highlighted',
                    'created_at',
                ]
            )->defaultValue(['created_at' => 'desc']),

            Pagination::create(),
        ];
    }
}
