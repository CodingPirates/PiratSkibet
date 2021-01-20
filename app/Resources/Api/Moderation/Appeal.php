<?php

namespace App\Resources\Api\Moderation;

use App\Models\Moderation\Appeal as Model;
use App\Models\Moderation\ModerationCase;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Appeal extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            'submit' => Store::create()
                ->model($this->model)
                ->fields($this->getFields())
                ->successMessage('Tak for din henvendelse, vi vender tilbage hurtigst muligt.'),
        ];
    }

    protected function getFields()
    {
        return [
            Field::create('name')->validates('nullable|string'),
            Field::create('email')->validates('required|email'),
            Field::create('phone')->validates('nullable|string'),
            Field::create('message')->validates('required|string'),
            Field::create('moderation_case_id')->validates(['moderation_case_id' => [
                'bail',
                'integer',
                'required',
                'exists:moderation_cases,id',
                function ($attribute, $value, $fail) {
                    if (!ModerationCase::findOrFail($value)->hasValidIdentifier(request()->input('identifier', ''))) {
                        $fail('Invalid signature.');
                    }
                },
            ]]),

        ];
    }

}
