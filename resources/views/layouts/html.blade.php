<!DOCTYPE html>
<html class="@yield('htmlClass')" lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>@yield('title')</title>

    <meta name="description" content="@yield('description')">
    <meta name="csrf-token" content="<?= csrf_token(); ?>"/>

	@yield('early-head')

	<!-- Page hiding snippet (recommended)  -->
	<style>.async-hide { opacity: 0 !important} </style>

    @include('partials.scripts.scripts')

    @if(config('app.env') === 'production')


    @endif

    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('img/favicon/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('img/favicon/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('img/favicon/favicon-16x16.png') }}">
    <link rel="mask-icon" href="{{ asset('img/favicon/safari-pinned-tab.svg') }}" color="#333333">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">
    <meta name="msapplication-TileColor" content="#333333">
    <meta name="theme-color" content="#ffffff">

    <meta property="og:url" content="{{ url()->current() }}"/>

    @if(isset(Context::env()->data()['env']['page']['og']))
        @foreach(Context::env()->data()['env']['page']['og'] as $key => $value)
            <meta property="og:{{ $key }}" content="{{ $value }}"/>
        @endforeach
    @endif

    @yield('add-meta')

    {{-- Styelsheets --}}
    {!! Context::stylesheets() !!}

    @yield('head')

    @if(app()->isProduction() && Context::is('app'))
        <!-- Matomo -->
        <script type="text/javascript">
            var _paq = window._paq || [];
            / tracker methods like "setCustomDimension" should be called before "trackPageView" /
            _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            _paq.push(["setCookieDomain", "*.piratskibet.dk"]);
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
                var u="https://codingpirates.dk/statistik/";
                _paq.push(['setTrackerUrl', u+'matomo.php']);
                _paq.push(['setSiteId', '3']);
                var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
        </script>
        <noscript><p><img src="https://codingpirates.dk/statistik/matomo.php?idsite=3&amp;rec=1" style="border:0;" alt="" /></p></noscript>
        <!-- End Matomo Code -->
    @endif

</head>
<body class="@yield('bodyClass')">
    @yield('body.before')
    @yield('body')
    @include('partials.preloader')

    {{-- Localizaton --}}
    {!! Context::env() !!}

    {{-- Scripts --}}
    {!! Context::scripts() !!}

    @yield('close-body')
    @yield('outer-body')
</body>
</html>
