<?php

namespace App\Console;

use Carbon\Carbon;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('users:clear-reserved-usernames')->daily();
        $schedule->command('users:schedule-reminder-emails')->daily();
        $schedule->command('sorting:calculate-sorting-score')->hourly();
        $schedule->command('schedule:event-reminders')->hourly();

        $schedule->command('twitch:update-status')->everyMinute(); // TODO - Transfer to queue

        $schedule->command('users:schedule-weekly-newsletter')
            ->timezone('Europe/Copenhagen')
            ->weeklyOn(Carbon::SATURDAY, '08:00');
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
