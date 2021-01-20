<?php

namespace App\Console\Commands\System;

use Illuminate\Console\Command;

class Setup extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'system:setup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sets up the project for the first time.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if ($this->confirm('WARNING: This will clear the DATABASE. Are you sure you want to continue?')) {

            $this->call('key:generate');
            $this->call('passport:keys');
            $this->call('config:cache');
            $this->call('storage:link');
            $this->call('system:build');

            $this->info('The system was successfully set up');

        }
    }
}
