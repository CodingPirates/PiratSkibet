<?php

namespace App\Jobs\Sorting;

use App\Models\Forum\Thread;
use App\Models\Projects\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CalculateSortScoreForModel implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;
    public $model = null;

    public function __construct(Model $model)
    {
        self::onQueue('sorting');
        $this->model = $model;
    }

    public function handle()
    {
        if($this->model && method_exists($this->model, 'calculateSortingScore')) {
            $this->model->calculateSortingScore();
        }
    }

}
