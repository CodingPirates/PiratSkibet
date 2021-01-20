<?php

namespace App\Resources\Api;

use App\Models\Avatar\AvatarItem as Model;
use App\Support\Enums\AvatarCategory;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class AvatarItem extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters()),
            Read::create()->model($this->model),
        ];
    }

    protected function getFields()
    {
        return [];
    }

    protected function getFilters()
    {
        return [

            Filter::create()->when('orderFirst')->scope('orderFirst'),

            Filter::create()->always(function (Builder $q) {
                $q->published();
                $q->orderByFeatured();
            }),

            Filter::create()
                ->when('user')
                ->default('user', null)
                ->scope('forUser'),

            Filter::create()->when('public')
                ->scope('public'),

            Filter::create()->when('category')
                ->default('category', AvatarCategory::BODY)
                ->placeholder('Kategori', AvatarCategory::all())
                ->scope('category'),

            Order::create()
                ->only('is_public')
                ->defaultValue('is_public'),
        ];
    }

}
