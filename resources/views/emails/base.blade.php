@component('mail::layout')
{{-- Header --}}
@slot('header')
@component('mail::header', ['url' => config('app.url')])
{{ config('app.name') }}
@endcomponent
@endslot

{{-- Greeting --}}
@if (! empty($greeting))
# {{ $greeting }}
@else
# @lang('emails.greetings.casual')
@endif

@yield('content')

{{-- Salutation --}}
@if (! empty($salutation))
{{ $salutation }}
@else
@lang('emails.salutation')
@endif
@component('mail::footer')
[![Logo]({{ asset('/img/logos/logo.png') }})]({{ route('app.home.index') }})
@endcomponent

{{-- Subcopy --}}
@isset($subcopy)
@slot('subcopy')
@component('mail::subcopy')
{{ $subcopy }}
@endcomponent
@endslot
@endisset

{{-- Footer --}}
@slot('footer')
@component('mail::footer')
@isset($footerContent)
{{ $footerContent }}
@endisset

© {{ date('Y') }} {{ config('app.name') }}. @lang('All rights reserved.')
@endcomponent
@endslot
@endcomponent
