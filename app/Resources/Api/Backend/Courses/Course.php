<?php

namespace App\Resources\Api\Backend\Courses;

use App\Models\Course\Course as Model;
use App\Models\Course\CourseCategory;
use App\Support\Enums\BasicResourceTypes;
use App\Support\Enums\DifficultyLevels;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\RelationshipFilter;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Delete;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Course extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters()),
            Read::create()->model($this->model)->filters($this->getReadFilters()),
            Store::create()->model($this->model)->fields($this->getFields()),
            Delete::create()->model($this->model)
        ];
    }

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:191'),
            Field::create('slug')->validates('nullable|alpha_dash|max:191')
                ->updates(function (Model $category, string $attribute, $value) {
                    $category->{$attribute} = empty($value) ? Str::slug($category->title, '_') : $value;
                }),

            Field::create('category_id')->validates('nullable|int|exists:course_categories,id'),
            Field::create('achievement_id')->validates('nullable|int|exists:achievements,id'),
            Field::create('description')->validates('required|string|max:10000'),

            EnumField::create('level')->from(DifficultyLevels::class),
            Field::create('position')->validates('required|int'),


            RelationshipField::create('resources', true)->fields([
                EnumField::create('type')->from(BasicResourceTypes::class)->required()->validatorName('resources.*.type'),
                Field::create('meta'),
            ])->removeMissing()->setOrderTo('position'),
        ];
    }

    protected function getReadFilters()
    {
        return [
            Filter::create()->always(function($q) {
                $q->with(['resources' => function($q) {
                    $q->orderBy('position');
                }]);
            })
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function ($q) {
                $q->withCategoryTitle();
            }),

            Search::create()->search([
                'title',
                'slug',
            ]),

            RelationshipFilter::create('category')
                ->placeholder('Vælg kategori')
                ->source(CourseCategory::query()->whereHas('courses'), 'title'),

            EnumFilter::create(DifficultyLevels::class, 'level')
                ->placeholder('Vælg sværhedsgrad', DifficultyLevels::values()),

            Order::create()
                ->only(['title', 'slug', 'position', 'level', 'category_title']),

            Pagination::create(),
        ];
    }
}
