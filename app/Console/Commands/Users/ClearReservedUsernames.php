<?php

namespace App\Console\Commands\Users;

use App\Models\User\ReservedUsername;
use Illuminate\Console\Command;

class ClearReservedUsernames extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:clear-reserved-usernames';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deletes expired ReservedUsernames';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        ReservedUsername::deleteExpired();
    }
}
