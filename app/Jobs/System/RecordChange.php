<?php

namespace App\Jobs\System;

use App\Models\Change;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class RecordChange implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;
    public $data = [];

    public function __construct($data)
    {
        self::onQueue('system');

        $this->data = $data;

    }

    public function handle()
    {

        if (empty($this->data)) {
            return;
        }

        $change = new Change();

        foreach ($this->data as $attribute => $value) {
            if($value instanceof \stdClass || is_array($value)) {
                $value = json_encode($value);
            }

            $change->{$attribute} = $value;
        }

        $change->save();

    }

}
