<?php

namespace App\Operations;

use MorningTrain\Laravel\Resources\Operations\Crud\Read;

class Action extends Read
{

    protected $trigger = null;

    public function trigger($value = null) {
        return $this->genericGetSet('trigger', $value);
    }

    public function handle($model_or_collection = null)
    {
        $item = parent::handle($model_or_collection);

        if($item === null || $this->trigger() === null) {
            return $item;
        }

        return $item->{$this->trigger()}();
    }

}
