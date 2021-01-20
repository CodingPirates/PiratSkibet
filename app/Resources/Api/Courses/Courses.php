<?php

namespace App\Resources\Api\Courses;

use App\Models\Course\Course as Model;
use App\Operations\Courses\Breadcrumbs;
use App\Operations\Courses\MakeProgress;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Courses extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->appends(['is_completed']),
            Read::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->appends(['prev_course', 'next_course', 'is_completed']),
            Breadcrumbs::create(),
            MakeProgress::create()->model($this->model),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->withCount('resources');
                $q->orderBy('level');
                $q->orderBy('position');
            }),
            Filter::create()->when('category_slug', function (Builder $q, $value) {
                return $q->categorySlug($value);
            }),
            Filter::create()->when('course', function (Builder $q, $value) {
                return $q->where('slug', $value);
            }),
        ];
    }

}
