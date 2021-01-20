<?php

namespace App\Mail\Contact;

use App\Models\ContactSubmission;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewContactSubmission extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * @var ContactSubmission
     */
    public $submission;

    /**
     * Create a new message instance.
     *
     * @param ContactSubmission $submission
     */
    public function __construct(ContactSubmission $submission)
    {
        $this->submission = $submission;

        $this->onQueue('emails');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.contact.new_submission')
            ->with(['response' => $this->makeResponse()]);
    }

    protected function makeResponse()
    {
        $base   = "mailto:{$this->submission->email}";
        $params = http_build_query([
            'subject' => "Re:{$this->submission->subject}",
            'body'    => "\n\n---------------------------------------------------\n\n{$this->submission->message}",
        ],
            null,
            '&',
            PHP_QUERY_RFC3986
        );

        return "{$base}?{$params}";
    }


}
