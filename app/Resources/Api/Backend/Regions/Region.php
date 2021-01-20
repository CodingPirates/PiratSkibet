<?php

namespace App\Resources\Api\Backend\Regions;


use App\Models\Regions\Region as Model;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Region extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters()),
        ];
    }
}
