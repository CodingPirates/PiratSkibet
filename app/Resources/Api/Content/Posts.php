<?php

namespace App\Resources\Api\Content;

use App\Models\Content\Post as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Posts extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            'read' => Index::create()
                ->model($this->model)
                ->single()
                ->filters($this->getFilters()),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                return $q->visible();
            }),
            Filter::create()->when('path', function (Builder $q, $path) {
                return $q->wherePath($path);
            }),
        ];
    }

}
