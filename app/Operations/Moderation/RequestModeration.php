<?php

namespace App\Operations\Moderation;

use App\Support\Enums\ModerationReasons;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class RequestModeration extends EloquentOperation
{

    const ROUTE_METHOD = 'post';

    private $validationRules = [];

    public function handle($moderateable = null)
    {
        validator(request()->all(), array_merge([
            'reason'  => 'required|string|in:' . implode(',', ModerationReasons::values()),
            'comment' => 'required|string',
        ], $this->validationRules))->validate();

        $this->setMessage($this->success_message ?? 'Tak for din henvendelse!');

        return $moderateable->flag(request()->reason, request()->comment);
    }

    public function validationRules(array $rules = [])
    {
        $this->validationRules = $rules;

        return $this;
    }

}
