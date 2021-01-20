<?php

namespace App\Resources\Backend;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Contact extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Contact.Index')
                ->path('contact_submissions')
                ->title('Kontakthenvendelser'),

            'edit' => React::create()
                ->component('Contact.Edit')
                ->path("contact_submissions/edit/{contact_submission?}")
                ->title('Kontakthenvendelse')
                ->parent('backend.contact_submissions.index'),

        ];
    }

}
