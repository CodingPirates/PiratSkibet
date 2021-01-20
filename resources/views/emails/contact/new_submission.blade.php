@component('mail::message')
# A new contact submission has been created

Subject: {{ $submission->subject }}

Message:<br/>{{ $submission->message }}

@component('mail::button', ['url' => route('backend.contact.edit', ['contact_submission' => $submission->id]), 'color' => 'success'])
View Contact Submission
@endcomponent

@component('mail::button', ['url' => $response, 'color' => 'success'])
Reply {{ $submission->email }}
@endcomponent

@endcomponent
