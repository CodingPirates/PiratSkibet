<?php

namespace App\Console\Commands\Events;

use App\Models\Events\Event;
use App\Models\Events\EventReminder;
use Illuminate\Console\Command;

class ScheduleEventReminders extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'schedule:event-reminders';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedules a Job for each Event';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $start = now()->startOf('hour');
        $end   = $start->copy()->endOf('hour');

        EventReminder::query()
            ->reminded(false)
            ->remindBefore($end)
            ->remindAfter($start)
            ->with('event:id')
            ->get()
            ->each
            ->scheduleReminder();
    }
}
