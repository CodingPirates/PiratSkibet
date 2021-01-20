<?php

namespace App\Models;

use App\Jobs\System\RecordChange;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Change extends Model
{

    protected $dates = ['created_at', 'updated_at', 'changed_at'];

    public static function record(Model $model)
    {

        /// We will not record newly created content as changes
        if(!$model->exists){
            return;
        }

        $dirty = $model->getDirty();

        if(empty($dirty)) {
            return;
        }

        foreach($dirty as $column => $value) {

            if(in_array($column, $model->ignoredChangeableAttributes())) {
                continue;
            }

            $original = $model->getOriginal($column);

            // If the attribute has a get mutator, we will call that then return what
            // it returns as the value, which is useful for transforming values on
            // retrieval from the model to a form that is more useful for usage.
            if ($model->hasGetMutator($column)) {
                $original = $model->mutateAttribute($column, $original);
            }

            // If the attribute exists within the cast array, we will convert it to
            // an appropriate native PHP type dependant upon the associated value
            // given with the key in the pair. Dayle made this comment line up.
            if ($model->hasCast($column)) {
                $original = $model->castAttribute($column, $original);
            }

            // If the attribute is listed as a date, we will convert it to a DateTime
            // instance on retrieval, which makes it quite convenient to work with
            // date fields without having to create a mutator for each property.
            if (in_array($column, $model->getDates()) &&
                ! is_null($original)) {
                $original = $model->asDateTime($original);
            }

            $current = $model->getAttribute($column);

            RecordChange::dispatch([
                'changed_at' => Carbon::now(),
                'changed_by' => Auth::id(),
                'changeable_id' => $model->getKey(),
                'changeable_type' => get_class($model),
                'column_name' => $column,
                'from_value' => $original,
                'from_type' => static::getType($original),
                'to_value' => $current,
                'to_type' => static::getType($current),
            ]);

        }


    }

    protected static function getType($value)
    {
        $type = gettype($value);

        if($type === 'object') {
            return get_class($value);
        }

        return $type;
    }

}
