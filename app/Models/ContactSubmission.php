<?php

namespace App\Models;

use App\Mail\Contact\NewContactSubmission;
use App\Models\User\User;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class ContactSubmission extends Model
{

    use Changeable;

    protected $dates = ['created_at', 'updated_at', 'recaptcha_at'];

    protected $hidden = [
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (ContactSubmission $submission) {
            if ($submission->score > 0.2) {
                $submission->scheduleMail();
            }

            User::query()->permission('backend.contact.index')->get()->each(function ($user) use($submission) {
                $user->notify(new \App\Notifications\System\NewContactSubmission($submission));
            });

        });
    }

    protected function scheduleMail()
    {
        Mail::to([config('mail.default_to')])->send(new NewContactSubmission($this));
    }


}
