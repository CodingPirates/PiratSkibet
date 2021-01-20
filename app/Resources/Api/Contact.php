<?php

namespace App\Resources\Api;

use App\Models\ContactSubmission as Model;
use App\Support\Enums\ContactSubmissionType;
use Facades\App\Support\Services\ReCaptcha;
use MorningTrain\Laravel\Fields\Fields\EnumField;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Contact extends CrudResource
{
    protected $model      = Model::class;

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
            Field::create('subject')->validates('required|string'),
            Field::create('message')->validates('required|string'),
            Field::create('name')->validates('nullable|string'),
            Field::create('phone')->validates('nullable|string'),
            Field::create('email')->validates('required|email'),
            EnumField::create('type')->from(ContactSubmissionType::class),

            Field::create('token')
                ->validates('required|string')
                ->updates(function (Model $submission, string $attr, $value, Field $field) {
                    $response = ReCaptcha::verify($value, 'contact_form');

                    if ($response !== false && is_object($response)) {
                        $submission->score        = $response->score;
                        $submission->recaptcha_at = \Carbon\Carbon::parse($response->challenge_ts);
                    }
                }),
        ];
    }

}
