@extends('emails.base')
@section('content')
@if($parent)
Øv! Dit barns bruger **{{ $user->username }}** er blevet blokeret fra Piratskibet.dk.

Vi er altid kede af, når det bliver nødvendigt, men det betyder, at dit barn ikke har levet op til [Piratskibets regelsæt]({{ route('app.pages.rules') }}), og i dette tilfælde af følgende årsag:
@else
Øv! Du er blevet blokeret fra Piratskibet.

Vi er altid kede af, når det bliver nødvendigt, men det betyder, at du har brudt [Piratskibets regelsæt]({{ route('app.pages.rules') }}).

Vi har gemt følgende regelbrud:
@endif

@if(filled($reason))
@component('mail::panel')
{{ $reason }}
@endcomponent
@endif

@if($parent)
For at blive bortvist skal man gentagende gange have brudt reglerne, eller have gjort noget helt uacceptabelt.

Udover reglerne kan du læse mere om Piratskibet [her]({{ route('app.pages.about') }}), og hvis I gerne vil gøre indsigelse over bortvisningen, kan I kontakte os på [piratskibet@codingpirates.dk](mailto:piratskibet@codingpirates.dk)
@else
For at blive bortvist skal du gentagende gange have brudt reglerne, eller have gjort noget helt uacceptabelt.

Hvis du vil snakke med os omkring bortvisningen, skal du kontakte os på [piratskibet@codingpirates.dk](mailto:piratskibet@codingpirates.dk). Det er bedst, hvis du får en af dine forældre til at skrive til os.
@endif

@component('mail::button', ['url' => $case->getAppealUrl(), 'color' => 'primary'])
Appeal your case
@endcomponent

@endsection
