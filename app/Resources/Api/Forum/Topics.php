<?php

namespace App\Resources\Api\Forum;

use App\Models\Forum\Topic as Model;
use App\Operations\Forum\Breadcrumbs;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Topics extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            'index' => Index::create()->model($this->model)->filters($this->getFilters())->appends(['latestMessage']),
            'read' => Read::create()->model($this->model),
            'breadcrumbs' => Breadcrumbs::create()->filters([
                Filter::create()->when('thread_id', function(){}),
                Filter::create()->when('topic_id', function(){}),
            ]),
        ];
    }

    public function getFilters()
    {
        return [
            Filter::create()->always(function ($builder) {
                /// Eager load a count of all thread immediately related to this topic. It is used in the overview
                $builder->withCount(['descendantThreads' => function (Builder $q) {
                    $q->public();
                }]);
            }),
            Filter::create()->when('parent_id', function ($builder, $parent_id) {
                return $builder->where('parent_id', '=', $parent_id);
            }),
        ];
    }

}
