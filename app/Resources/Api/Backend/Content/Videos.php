<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\Content\Video as Model;
use App\Support\Enums\Boolean;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\SyncManyField;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Filters\Filters\SelectFilter;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Videos extends CrudResource
{
    protected $model = Model::class;

    public function configureReadOperation(Read $operation): void
    {
        $operation->view(['with' => ['categories']]);
    }

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:255'),
            Field::create('description')->validates('required|string|max:21844'),
            Field::create('video_id')->validates('required|string|max:191'),
            Field::create('is_highlighted')->validates('required|boolean'),

            SyncManyField::create('categories')
                ->relation('categories')
                ->validates('required|integer|exists:project_categories,id', 'categories.*.id'),
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
                    'title',
                    'is_highlighted',
                    'created_at',
                ]
            )->defaultValue(['created_at' => 'desc']),

            Search::create()->search([
                'title',
                'description'
            ]),

            Pagination::create(),
        ];
    }
}
