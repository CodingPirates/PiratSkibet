<?php

namespace App\Jobs\Users;

use App\Mail\User\SignupReminder;
use App\Models\User\User;
use App\Support\Enums\UserRoles;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendSignupReminderEmails implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 3;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->onQueue('system');
    }

    public function handle(): void
    {
        $this->sendReminder(today()->subDays(config('system.signup_reminders.days_since_first')), 1);
        $this->sendReminder(today()->subDays(config('system.signup_reminders.days_since_second')), 2);
    }

    private function sendReminder(Carbon $creationDate, int $reminder): void
    {
        User::query()
            ->role(UserRoles::LANDLUBBER)
            ->whereDate('created_at', $creationDate)
            ->get()
            ->each(function (User $user) use ($reminder) {
                Mail::to($user->email)
                    ->later(
                        today()->timezone('Europe/Copenhagen')->hours(config('system.signup_reminders.send_at_hours')),
                        new SignupReminder($reminder)
                    );
            });
    }
}
