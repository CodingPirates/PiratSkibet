<?php

namespace App\Resources\Api;

use App\Models\Events\Event as Model;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Event extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters()),
            Read::create()->model($this->model),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                return $q->published()
                    ->orderBy('start_at', 'asc');
            }),

            Filter::create()->when('expired', function (Builder $q, $expired) {
                return $q->expired((bool)$expired);
            }),

            Filter::create()->when('zipcode', function (Builder $q, $zip) {
                return $q->forZipcode($zip);
            }),

            Pagination::create(),
        ];
    }

}
