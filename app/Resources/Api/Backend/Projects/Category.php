<?php

namespace App\Resources\Api\Backend\Projects;


use App\Models\Projects\Category as Model;
use App\Support\Enums\VisibleStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Category extends CrudResource
{
    protected $model      = Model::class;

    public function configureReadOperation(Read $operation)
    {
        $operation->filters([
            Filter::create()->always(function (Builder $q) {
                $q->with(['children' => function ($q) {
                    $q->orderBy('priority', 'asc');
                }]);
            })
        ]);
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('required|string|max:191'),
            Field::create('slug')->validates('nullable|alpha_dash|max:191')
                ->updates(function (Model $topic, string $attribute, $value) {
                    $topic->{$attribute} = empty($value) ? Str::slug($topic->name, '_') : $value;
                }),
            EnumField::create('status')->from(VisibleStatus::class)->required(),

            RelationshipField::create('children', true)->fields([
                Field::create('name')->validates('required|string|max:191', 'children.*.name'),
                Field::create('slug')->validates('nullable|alpha_dash|max:191', 'children.*.slug')
                    ->updates(function (Model $topic, string $attribute, $value) {
                        $topic->{$attribute} = empty($value) ? Str::slug($topic->name, '_') : $value;
                    }),
                EnumField::create('status')
                    ->validatorName('children.*.status')
                    ->from(VisibleStatus::class)
                    ->required(),
            ])->removeMissing()->setOrderTo('priority'),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function ($q) {
                return $q->parent();
            }),

            Search::create()->search([
                'name',
                'slug',
            ]),

            Order::create()->only([
                'name',
                'slug',
            ]),
            Pagination::create(),
        ];
    }
}
