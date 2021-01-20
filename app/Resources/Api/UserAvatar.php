<?php

namespace App\Resources\Api;

use App\Models\Avatar\UserAvatar as Model;
use App\Support\Fields\AvatarField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Delete;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class UserAvatar extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            //Index::create()->model($this->model)->filters($this->getFilters()),
            Read::create()->model($this->model),
            Store::create()->model($this->model)->fields($this->getFields())->successMessage('Din pirat er blevet gemt!'),
            //Delete::create()->model($this->model),
            'fetch' => Index::create()->model($this->model)->filters($this->getFetchFilters())
        ];
    }

    protected function getFields()
    {
        return [
            AvatarField::create(''),
        ];
    }

    protected function getFilters()
    {
        return [
        ];
    }

    protected function getFetchFilters()
    {
        return [
            Filter::create()->always(function ($builder) {
                $builder->with([
                    'user' => function ($builder) {
                        $builder->select('id', 'user_avatar_id');
                    }
                ]);
            }),
            Filter::create()->when('ids', function ($builder, $ids) {
                $builder->whereHas('user', function ($builder) use ($ids) {
                    $builder->whereIn('id', $ids);
                });
            })
        ];
    }

}
