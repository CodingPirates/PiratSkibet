<?php

namespace App\Resources\Api\Backend\Content;


use App\Models\News as Model;
use App\Support\Enums\Boolean;
use App\Support\Enums\GenericStatus;
use App\Support\Enums\Theme;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Filters\Filters\SelectFilter;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class News extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:191'),
            Field::create('img')->validates('required|url|max:191'),
            Field::create('link')->validates('required|url|max:191'),
            Field::create('subtext')->validates('required|string|max:10000'),

            // Enums
            EnumField::create('theme')->from(Theme::class)->required(),
            EnumField::create('status')->from(GenericStatus::class)->required(),

            Field::create('featured')->validates('required|boolean'),
            Field::create('publish_at')->validates('required|date'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'title',
                'subtext',
            ]),

            EnumFilter::create(GenericStatus::class, 'status')
                ->placeholder('Vælg status', GenericStatus::values()),

            SelectFilter::create('featured')
                ->placeholder('Vælg fremhævet status')
                ->options([
                    Boolean::YES => 'Vis kun fremhævede',
                    Boolean::NO  => 'Vis ikke fremhævede',
                ]),

            Order::create()->only([
                'title',
                'publish_at',
                'featured',
                'status',
            ]),

            Pagination::create(),
        ];
    }
}
