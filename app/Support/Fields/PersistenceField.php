<?php

namespace App\Support\Fields;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;
use MorningTrain\Laravel\Fields\Fields\Field;

class PersistenceField extends Field
{

    protected function checkRequest(Request $request)
    {
        return true;
    }

    protected function processRules(Model $model, $rules)
    {
        return [];
    }

    public function getUpdateMethod()
    {
        return $this->update ?? null;
    }

    protected function performUpdate(Model $model, Request $request)
    {
        $update = $this->getUpdateMethod();

        return ($update !== null) ?
            $update($model, $request, $this) :
            null;
    }
}
