<?php

namespace App\Providers;

use App\Http\View\Composers\ThreadActivitySummaryComposer;
use App\Models\Avatar\AvatarItem;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use App\Http\View\Composers\ProjectActivitySummaryComposer;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Schema::defaultStringLength(191);

        Validator::extend('alpha_dash_dot', function ($attribute, $value, $parameters, $validator) {
            if (! is_string($value) && ! is_numeric($value)) {
                return false;
            }

            return preg_match('/^[\pL\pM\pN._-]+$/u', $value) > 0;
        });

        Validator::extend('filled_html', function ($attribute, $value, $parameters, $validator) {
            return is_string($value)
                && !empty(trim($value))
                && !empty(trim(strip_tags($value)));
        });

        Validator::extend('avatar_item_is_available', function ($attribute, $value, $parameters, $validator) {
            return AvatarItem::query()->findOrFail($value)->userHasItem();
        });

        View::composer(
            'emails.user.weekly-newsletter',
            ProjectActivitySummaryComposer::class
        );

        View::composer(
            'emails.user.weekly-newsletter',
            ThreadActivitySummaryComposer::class
        );
    }
}
