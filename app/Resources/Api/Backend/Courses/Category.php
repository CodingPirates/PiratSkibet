<?php

namespace App\Resources\Api\Backend\Courses;

use App\Models\Course\CourseCategory as Model;
use App\Support\Enums\BasicResourceTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
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

            RelationshipField::create('resource_links', true)->fields([
                Field::create('text'),
                Field::create('url'),
            ])->removeMissing()->setOrderTo('position'),
        ];
    }

    public function configureReadOperation(Read $operation)
    {
        $operation->filters([
            Filter::create()->always(function (Builder $query) {
                $query->with('logo');
                $query->with('thumbnail');
                $query->with('resourceLinks');
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
