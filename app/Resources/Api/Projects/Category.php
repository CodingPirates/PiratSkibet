<?php

namespace App\Resources\Api\Projects;


use App\Models\Projects\Category as Model;
use App\Support\Enums\VisibleStatus;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Category extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters())->appends(['display_name']),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->public();
                $q->with('parent:id,name');
                $q->orderBy('parent_id', 'asc');
                $q->orderBy('priority', 'asc');
            }),
            Filter::create()->when('project', function (Builder $q, $project) {
                $q->where('status', VisibleStatus::VISIBLE);
                $q->orWhereHas('projects', function ($q) use ($project) {
                    $q->whereId($project);
                });
            }),
            Filter::create()->when('children', function (Builder $q) {
                $q->parent(false);
            }),
            Filter::create()->when('parents', function (Builder $q) {
                $q->parent(true);
            }),
        ];
    }
}
