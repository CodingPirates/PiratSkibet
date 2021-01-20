<?php

namespace App\Resources\Api\Backend\Gamification;


use App\Models\Avatar\AvatarItem as Model;
use App\Operations\Avatars\RandomAvatar;
use App\Support\Enums\AvatarCategory;
use App\Support\Enums\GenericStatus;
use App\Support\Enums\SelectableAvatarCategory;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class AvatarItem extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return array_merge(
            parent::operations(),
            [
                RandomAvatar::create()
            ]
        );
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('required|string|max:191'),
            EnumField::create('category')->from(AvatarCategory::class)->required(),
            EnumField::create('status')->from(GenericStatus::class)->required(),
            Field::create('meta'),
            Field::create('content'),
            Field::create('is_public'),
            Field::create('is_default'),
            Field::create('is_featured'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'name',
            ]),

            Filter::create()->when('published')->scope('published'),
            Filter::create()->when('public')->scope('public'),

            EnumFilter::create(SelectableAvatarCategory::class, 'category')
                ->placeholder('Vælg kategori')
                ->scope('category'),

            Order::create()->only([
                'name',
                'category',
            ]),

            Pagination::create(),
        ];
    }
}
