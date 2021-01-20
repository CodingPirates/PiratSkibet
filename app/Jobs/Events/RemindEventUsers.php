<?php

namespace App\Jobs\Events;

use App\Models\Events\Event;
use App\Models\Events\EventReminder;
use App\Notifications\EventReminderNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class RemindEventUsers implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $event;
    protected $reminder;

    /**
     * Create a new job instance.
     *
     * @param Event $event
     */
    public function __construct(EventReminder $reminder, Event $event)
    {
        self::onQueue('events'); // TODO

        $this->reminder = $reminder;
        $this->event    = $event;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->reminder->reminded) return;

        $this->event
            ->relevantUsers
            ->each
            ->notify(new EventReminderNotification($this->event));

        $this->reminder->reminded = true;
        $this->reminder->save();
    }
}
