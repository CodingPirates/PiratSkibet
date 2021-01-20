<?php

namespace App\Resources\Api\Rewards;

use App\Models\Rewards\UserTitle as Model;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Action;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class UserTitle extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->appends(['selected_by_user']),

            'select' => Action::create()
                ->model($this->model)
                ->filters([
                    Filter::create()->always()->scope('forUser'),
                ])
                ->trigger('selectForUser'),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()
                ->when('user')
                ->default('user', null)
                ->scope('forUser'),
        ];
    }
}
