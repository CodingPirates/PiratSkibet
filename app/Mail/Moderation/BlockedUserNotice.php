<?php

namespace App\Mail\Moderation;

use App\Models\Moderation\ModerationCase;
use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BlockedUserNotice extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $case;
    public $user;
    public $reason;
    public $parent;
    public $greeting;

    /**
     * Create a new message instance.
     * @param ModerationCase $case
     * @param User $user
     * @param string|null $reason
     * @param bool $parent
     */
    public function __construct(ModerationCase $case, User $user, string $reason = null, bool $parent = false)
    {
        $this->case     = $case;
        $this->user     = $user;
        $this->reason   = $reason;
        $this->parent   = $parent;
        $this->greeting = $parent
            ? trans('emails.greetings.polite', ['title' => trans('misc.parent')])
            : null;

        $this->onQueue('emails');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.moderation.blocked_notice')->subject('Brugerblokering');
    }

}
