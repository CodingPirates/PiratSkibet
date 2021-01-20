<?php

namespace App\Notifications\Auth;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Lang;
use Illuminate\Support\Facades\URL;

class VerifyEmail extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
        self::onQueue('notifications');
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Build the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        $verificationUrl = $this->verificationUrl($notifiable);

        return (new MailMessage)
            ->subject(Lang::get('emails.verify_parent_email.subject'))
            ->greeting(Lang::get('emails.greetings.polite', ['title' => Lang::get('misc.parent')]))
            ->line(Lang::get('emails.verify_parent_email.line_1'))
            ->line(Lang::get('emails.verify_parent_email.line_2', ['url' => route('app.pages.about')]))
            ->line(Lang::get('emails.verify_parent_email.line_3', ['username' => $notifiable->username, 'url' => route('app.pirate.pirate', ['username' => $notifiable->username])]))
            ->line(Lang::get('emails.verify_parent_email.line_4'))
            ->line(Lang::get('emails.verify_parent_email.line_5'))
            ->line(Lang::get('emails.verify_parent_email.line_6'))
            ->action(Lang::get('emails.verify_parent_email.action'), $verificationUrl)
            ->salutation(Lang::get('emails.salutation'));
    }

    /**
     * Get the verification URL for the given notifiable.
     *
     * @param  mixed  $notifiable
     * @return string
     */
    protected function verificationUrl($notifiable)
    {
        return URL::temporarySignedRoute(
            'auth.register.verify_email',
            Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
            [
                'id' => $notifiable->getKey(),
                'hash' => sha1($notifiable->getEmailForVerification()),
            ]
        );
    }
}
