<?php

namespace App\Support\Traits;

use App\Models\Change;

trait Changeable
{
    private $logChanges = true;

    protected static function bootChangeable()
    {
        static::saved(function ($model) {
            if ($model->logChanges) {
                Change::record($model);
            }
        });
    }

    public function ignoredChangeableAttributes()
    {
        return ['created_at', 'updated_at'];
    }

    public function saveWithoutLogging()
    {
        try {
            $this->logChanges = false;

            return $this->save();
        } finally {
            $this->logChanges = true;
        }
    }
}
