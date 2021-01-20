<?php

namespace App\Resources\Api\Courses;

use App\Models\Course\CourseResource as Model;
use App\Operations\Courses\AnswerQuestion;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class CourseResource extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters()),
            'read' => Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->single(),
            'answer' => AnswerQuestion::create()->model($this->model),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->when('course_slug', function (Builder $q, $value) {
                return $q->whereCourseSlug($value);
            }),

            Filter::create()->always(function (Builder $q) {

                $q->with('my_progress');

                return $q->orderBy('position');
            }),
        ];
    }

}
