<?php

namespace App\Resources\Api\Courses;

use App\Models\Course\CourseCategory as Model;
use App\Operations\Courses\Breadcrumbs;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Category extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->appends(['logo_url', 'thumbnail_url']),

            Breadcrumbs::create(),
            'newest' => Index::create()->model($this->model)->appends(['logo_url']),
            'read' => Index::create()->model($this->model)->filters($this->getFilters())->single(),
        ];
    }

    public function configureNewestOperation(Index $operation)
    {
        $operation->filters([
            Filter::create()->always(function (Builder $query) {
                $query->where('active', '=', true);
            }),

            Order::create()
                ->only('created_at')
                ->defaultValue(['created_at' => 'DESC']),

            Pagination::create()->shows(3),
        ]);
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->withCount('completedCourses');
                $q->withCount('courses');
                $q->with('resourceLinks');
                return $q->where('active', '=', true);
            }),

            Filter::create()->when('slug', function (Builder $q, $value) {
                return $q->where('slug', '=', $value);
            }),

            Search::create()->search([
                'title',
                'slug',
            ]),

            Pagination::create(),
        ];
    }
}
