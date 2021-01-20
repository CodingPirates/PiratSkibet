<?php

namespace App\Console\Commands\System;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\App;

class Refresh extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'system:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reloads config and updates permissions';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        // Config
        //

        $this->call('cache:clear');
        $this->call('route:clear');
        $this->call('permission:cache-reset');

        App::environment('local') ?
            $this->call('config:clear') :
            $this->call('config:cache');


        $this->call('mt:refresh-permissions');

        $this->call('queue:restart');

        $this->info('The system was successfully refreshed.');
    }
}
