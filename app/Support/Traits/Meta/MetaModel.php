<?php

namespace App\Support\Traits\Meta;

use Carbon\Carbon;

trait MetaModel
{

    ////////////////////////////////
    // Helpers
    ////////////////////////////////

    public function getValueAs($type)
    {
        switch ($type) {
            case 'json':
                return json_decode($this->attributes['value']);

            case 'int':
            case 'integer':
                return intval($this->attributes['value']);

            case 'float':
                return floatval($this->attributes['value']);

            case 'bool':
            case 'boolean':
                return intval($this->attributes['value']) === 1;

            case 'date':
                return strlen($this->attributes['value']) > 0 ?
                    Carbon::createFromFormat('Y-m-d H:i:s', $this->attributes['value']) :
                    null;

            default:
                return $this->attributes['value'];
        }
    }

    ////////////////////////////////
    // Accessors
    ////////////////////////////////

    public function getValueAttribute()
    {
        return $this->getValueAs($this->type);
    }

    public function setValueAttribute($value)
    {
        switch ($this->type) {
            case 'json':
                $this->attributes['value'] = json_encode($value);
                break;

            case 'int':
            case 'integer':
                $this->attributes['value'] = intval($value);
                break;

            case 'float':
                $this->attributes['value'] = floatval($value);
                break;

            case 'bool':
            case 'boolean':
                $this->attributes['value'] = $value ? 1 : 0;
                break;

            case 'date':
                $this->attributes['value'] = $value instanceof Carbon ?
                    $value->format('Y-m-d H:i:s') :
                    '';

                break;

            default:
                $this->attributes['value'] = $value;
                break;
        }
    }

}
