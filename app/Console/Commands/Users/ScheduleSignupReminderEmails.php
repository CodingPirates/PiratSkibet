<?php

namespace App\Console\Commands\Users;

use App\Jobs\Users\SendSignupReminderEmails;
use Illuminate\Console\Command;

class ScheduleSignupReminderEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:schedule-reminder-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Queue\'s jobs for finding landlubbers, who need reminding to finalize their signup.';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        SendSignupReminderEmails::dispatch();
    }
}
