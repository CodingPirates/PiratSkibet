<?php

namespace App\Mail\User;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SignupReminder extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $greeting;
    public $heading;
    public $subject;

    /**
     * Create a new message instance.
     *
     * @param int $reminder
     */
    public function __construct(int $reminder)
    {
        $this->greeting = trans('emails.signup_reminder.greeting');
        $this->heading = trans_choice('emails.signup_reminder.heading', $reminder);
        $this->subject = trans_choice('emails.signup_reminder.subject', $reminder);

        $this->onQueue('emails');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.user.signup-reminder')
            ->subject($this->subject);
    }
}
