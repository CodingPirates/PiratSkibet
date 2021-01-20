<?php

namespace App\Resources\Api\Backend\Users;

use App\Models\ContactSubmission as Model;
use App\Support\Enums\ContactSubmissionType;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Contact extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return array_merge(parent::operations(), [
        ]);
    }

    protected function getFilters()
    {
        return [
            Search::create()->search([
                'name',
                'email',
                'subject',
                'phone',
                'message',
            ]),

            EnumFilter::create(ContactSubmissionType::class, 'type')
                ->placeholder('Vælg type', ContactSubmissionType::all()),

            Order::create()
                ->only(['created_at', 'score', 'type', 'subject', 'name', 'email', 'phone'])
                ->defaultValue(['created_at' => 'desc']),
        ];
    }
}
