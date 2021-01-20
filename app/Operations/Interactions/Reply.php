<?php

namespace App\Operations\Interactions;

use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class Reply extends EloquentOperation
{

    const ROUTE_METHOD = 'post';

    protected $trigger = null;

    public function trigger($value = null) {
        return $this->genericGetSet('trigger', $value);
    }

    public function handle($item = null)
    {

        validator(request()->all(), [
            'reply' => 'required|boolean',
        ])->validate();

        $item = parent::handle($item);

        if($item === null || $this->trigger() === null) {
            return $item;
        }

        $reply = filter_var(request()->input('reply'), FILTER_VALIDATE_BOOLEAN);

        return $item->{$this->trigger()}($reply);
    }


}
