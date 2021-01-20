@if(isset($projectHighlight) || isset($threadHighlight))

@if(isset($projectHighlight))
## {{ $projectHighlight }}

@if(isset($projectSummary))
{{ $projectSummary }}
@endif

@endif

@if(isset($threadHighlight))
## {{ $threadHighlight }}

@if(isset($threadSummary))
{{ $threadSummary }}
@endif

@endif

@component('mail::button', ['url' => route('app.home.index', ['promptLogin' => true])])
Log ind på Piratskibet for at se dine notifikationer.
@endcomponent
@endif



