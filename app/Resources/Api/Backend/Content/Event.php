<?php

namespace App\Resources\Api\Backend\Content;

use App\Models\Events\Event as Model;
use App\Support\Enums\EventStatus;
use App\Support\Fields\PersistenceField;
use Illuminate\Http\Request;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Fields\Fields\RelationshipField;
use MorningTrain\Laravel\Fields\Fields\SyncManyField;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Event extends CrudResource
{
    protected $model      = Model::class;

    public function configureReadOperation(Read $operation)
    {
        $operation->view(['with' => ['regions', 'reminders']]);
    }

    protected function getFields()
    {
        return [
            Field::create('title')->validates('required|string|max:191'),
            Field::create('link')->validates('required|url|max:191'),
            Field::create('img')->validates('required|url|max:191'),
            Field::create('description')
                ->validates('required|string|max:10000'),

            // Enums
            EnumField::create('status')->from(EventStatus::class)->required(),

            Field::create('publish_at')->validates('required|date'),
            Field::create('start_at')->validates('required|date'),
            Field::create('end_at')->validates('required|date'),

            RelationshipField::create('reminders', true)->fields([
                Field::create('remind_at')->validates('required|date', 'reminders.*.remind_at'),
            ])->removeMissing(),
            PersistenceField::create()->updates(function (Model $model, Request $request) {
                if ($model->wasRecentlyCreated) {
                    $model->setupDefaultReminders();
                }
            }, Field::AFTER_SAVE),

            SyncManyField::create('regions')
                ->relation('regions')
                ->validates('required|integer|exists:regions,id', 'regions.*.id'),
        ];
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'title',
                'description',
            ]),

            EnumFilter::create(EventStatus::class, 'status')
                ->placeholder('Vælg status', EventStatus::all()),

            Order::create()
                ->only(['status', 'title', 'start_at', 'end_at']),

            Pagination::create(),
        ];
    }
}
