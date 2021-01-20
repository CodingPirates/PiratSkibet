<?php

namespace App\Resources\Api\Backend\Content;

use App\Models\Content\Post as Model;
use App\Support\Enums\GenericStatus;
use App\Support\Enums\PostType;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Posts extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('path')->validates('required|string|max:191'),
            Field::create('title')->validates('required|string|max:191'),
            Field::create('description')->validates('nullable|string|max:191'),
            Field::create('image')->validates('nullable|string|max:191'),
            Field::create('content')->validates('required|string'),
            EnumField::create('type')->from(PostType::class),
            EnumField::create('status')->from(GenericStatus::class)->required(),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'title',
                'content',
                'path',
            ]),
            EnumFilter::create(PostType::class, 'type')->default('type', PostType::PAGE)->placeholder('Vælg type', PostType::all()),
            EnumFilter::create(GenericStatus::class, 'status')->placeholder('Vælg status'),
            Order::create()->only(['type', 'status', 'title', 'updated_at']),
            Pagination::create(),
        ];
    }
}
