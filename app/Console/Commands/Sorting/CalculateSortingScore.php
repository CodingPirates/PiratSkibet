<?php

namespace App\Console\Commands\Sorting;

use App\Jobs\Sorting\CalculateSortScore;
use Illuminate\Console\Command;

class CalculateSortingScore extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sorting:calculate-sorting-score';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reloads config and runs migrations';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        CalculateSortScore::dispatch();
    }
}
