<?php

namespace App\Operations;


use Illuminate\Http\Request;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Resources\Operations\Auth\Login as LoginOperation;

class Login extends LoginOperation
{

    protected $middlewares = [];
    protected $username;

    public function username(): string
    {
        return $this->username;
    }

    public function handle($model_or_collection = null)
    {
        $this->username = $this->findUsername();

        parent::handle($model_or_collection);
    }

    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        $remember = (bool)$request->input('remember', 0);

        return $this->guard()->attempt(
            $this->credentials($request), $remember
        );
    }

    protected function authenticated(Request $request, $user)
    {
        $message = trans('auth.logged_in', ['username' => $user->username]);
        $session = $request->session();

        if ($session && Str::contains($session->get('url.intended', ''),
                route('auth.register.verify_email', ['', ''], false))) {
            $message = trans('auth.email_verification_post_login');
        }

        $this->setMessage($message);

        return parent::authenticated($request, $user);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function findUsername(): string
    {
        $login = request()->input('login');

        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        request()->merge([$fieldType => $login]);

        return $fieldType;
    }
}
