<?php

namespace App\Resources\Api\Backend\Courses;

use App\Models\Course\CourseCategory as Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Files\FilesField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Category extends CrudResource
{
    protected $model      = Model::class;

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:191'),
            Field::create('slug')->validates('nullable|alpha_dash|max:191')
                ->updates(function (Model $category, string $attribute, $value) {
                    $category->{$attribute} = empty($value) ? Str::slug($category->title, '_') : $value;
                }),
            Field::create('active')->validates('boolean'),
            Field::create('description')->validates('nullable|string|max:500000'),
            Field::create('color')->validates('nullable|string'),

            FilesField::create('logo')->validates('file|image'),
            FilesField::create('thumbnail')->validates('file|image'),
        ];
    }

    public function configureReadOperation(Read $operation)
    {
        $operation->filters([
            Filter::create()->always(function (Builder $q) {
                $q->with('logo');
                $q->with('thumbnail');
            }),
        ]);
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'title',
                'slug',
            ]),
            Order::create()->only(['title', 'slug']),
            Pagination::create(),
        ];
    }
}
