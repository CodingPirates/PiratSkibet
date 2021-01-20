<?php

namespace App\Jobs\Sorting;

use App\Models\Forum\Thread;
use App\Models\Projects\Project;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class CalculateSortScore implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;

    public function __construct()
    {
        self::onQueue('sorting');
    }

    public function handle()
    {
        Thread::query()
            ->with('latestMessage')
            ->get()
            ->each(function ($model) {
                CalculateSortScoreForModel::dispatch($model);
            });

        Project::query()
            ->with('endorsements')
            ->with('thread.latestMessage')
            ->get()
            ->each(function ($model) {
                CalculateSortScoreForModel::dispatch($model);
            });

    }

}
