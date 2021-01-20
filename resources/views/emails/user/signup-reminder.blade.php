@extends('emails.base')
@section('content')
@if(isset($heading))
{{ $heading }}

Men … du er desværre stadig kun en Landkrabbe, og for at blive opgraderet til en ægte Pirat, skal du lige have en af din forældre til at hjælpe dig med det sidste.

Forskellen på en Landkrabbe og en Pirat er simpel men stor:

Landkrabber kan ikke lægge ting op på Piratskibet, heller ikke modtage spændende skattekister, eller deltage i Piratsnak og konkurrencer.

Det kan Pirater, og det vil du da ikke gå glip af, vel?

Så hvad skal du gøre?
@component('mail::panel')
1. Log ind på Piratskibet [her]({{ route('app.home.index', ['promptLogin' => 1]) }})
2. Tryk på ”Vis tjekliste”
3. Udfyld de manglende punkter sammen med en af dine forældre
@endcomponent
Så modtager dine forældre en mail, som de skal huske at tjekke.

Hvis de glemmer det, må du lige stikke lidt til dem med din sabel. Ikke for hårdt.

Så er du klar – og 100% Pirat.

Vi glæder os til at se dig!
@endif
@endsection
