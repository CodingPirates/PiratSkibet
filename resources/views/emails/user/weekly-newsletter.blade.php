@extends('emails.base')
@section('content')

Her er din ugentlige opdatering fra Piratskibet.

@include('emails.user.newsletter.notifications')

@if($projects)
## Tjek disse nye spændende projekter fra andre pirater
@include('emails.user.newsletter.highlights', ['items' => $projects])
@endif

@if($courses)
## Prøv de seneste forløb i Kodehavet
@include('emails.user.newsletter.highlights', ['items' => $courses])
@endif

@if($streams)
## Se eller gense de nyeste streams på Coding Pirates TV
@include('emails.user.newsletter.highlights', ['items' => $streams])
@endif

@endsection
