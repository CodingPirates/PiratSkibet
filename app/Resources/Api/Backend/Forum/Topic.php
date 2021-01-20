<?php

namespace App\Resources\Api\Backend\Forum;


use App\Models\Forum\Topic as Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\RelationshipFilter;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Topic extends CrudResource
{
    protected $model      = Model::class;

    public function configureReadOperation(Read $operation)
    {
        $operation->view(['with' => ['children']]);
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('required|string|max:191'),
            Field::create('slug')->validates('nullable|alpha_dash|max:191')
                ->updates(function (Model $topic, string $attribute, $value) {
                    $topic->{$attribute} = empty($value) ? Str::slug($topic->name, '_') : $value;
                }),

            Field::create('description')->validates('nullable|string|max:255'),
            // TODO enum status field

            RelationshipField::create('children', true)->fields([
                Field::create('name')->validates('required|string|max:191', 'children.*.name'),
                Field::create('slug')->validates('nullable|alpha_dash|max:191', 'children.*.slug')
                    ->updates(function (Model $topic, string $attribute, $value) {
                        $topic->{$attribute} = empty($value) ? Str::slug($topic->name, '_') : $value;
                    }),

                Field::create('description')->validates('nullable|string|max:255', 'children.*.description'),
            ])->removeMissing(),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->withParentName();
            }),
            Search::create()->search([
                'name',
                'slug',
                'parent' => ['name', 'slug'],
            ]),

            RelationshipFilter::create('parent')
                ->placeholder('Vælg overemmne')
                ->source(Model::query()->whereHas('children'), 'name'),

            Order::create()->only([
                'name',
                'slug',
                'parent_name',
            ]),
            Pagination::create(),
        ];
    }
}
