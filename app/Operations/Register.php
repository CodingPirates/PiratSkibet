<?php

namespace App\Operations;


use App\Models\Avatar\AvatarItem;
use App\Models\Avatar\UserAvatar;
use App\Models\User\User;
use App\Models\User\ReservedUsername;
use App\Support\Enums\AvatarCategory;
use App\Support\Enums\NotificationType;
use App\Support\Enums\UserRoles;
use App\Support\Fields\AvatarField;
use Illuminate\Auth\Events\Registered;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use MorningTrain\Laravel\Resources\Support\Contracts\Operation;
use PermissionsService;

class Register extends Operation
{
    use RegistersUsers;

    const ROUTE_METHOD = 'post';

    protected $middlewares = ['guest'];

    public function handle($model_or_collection = null)
    {
        $step = request()->input('step', '');
        $data = request()->all();

        switch ($step) {
            case 'user':
                $this->doUserStep($data);
                $next = 'avatar';
                break;

            case 'avatar':
                return $this->doAvatarStep($data);

            default:
                $this->resetSession();
                $next = 'user';
        }

        $res = Arr::except(
            session()->get('register', []),
            ['password', 'unique_key']
        );
        $res['step'] = $next;

        return ['model' => $res];
    }


    /////////////////////////////
    /// Steps
    /////////////////////////////

    protected function doUserStep(array $data)
    {
        $identifier = session()->get('register.unique_key');

        validator($data, array_merge(
            ['password' => ['required', 'string', 'min:8', 'confirmed']],
            static::getUserValidationRules($identifier)
        ))->validate();

        ReservedUsername::reserveUsername($data['username'], $identifier);

        $this->saveStep([
            'name'       => $data['name'],
            'age'        => $data['age'],
            'email'      => $data['email'],
            'newsletter' => (bool)($data['newsletter'] ?? false),
            'username'   => $data['username'],
            'password'   => Hash::make($data['password']),
        ]);
    }

    protected function doAvatarStep(array $data)
    {
        validator($data, static::getAvatarValidationRules())->validate();

        // Only saved expected category values
        $values = array_intersect_key($data,
            array_flip(AvatarCategory::values()));

        $this->saveStep($values);
        $this->saveStep([
            'avatar' => $this->getAvatarItems(), // TODO - If the "shuffle" button get's implemented this could be removed.
        ]);

        $identifier = session()->get('register.unique_key');

        $all_rules = array_merge(
            ['password' => ['required', 'string']],
            static::getUserValidationRules($identifier),
            static::getAvatarValidationRules()
        );

        $user_data = session()->get('register');

        if (validator($user_data, $all_rules)->fails()) {
            abort(400, 'Bad request.');
        }

        // Setup user
        $user = $this->createUser($user_data);
        $user->assignRole(UserRoles::LANDLUBBER);

        // Setup avatar
        $user->userAvatar->setItems($user_data);
        $user->userAvatar->save();

        ReservedUsername::removeReservation($identifier);
        session()->forget('register');

        return $this->registered(request(), $user);
    }


    /////////////////////////////
    /// Validation rules
    /////////////////////////////

    protected static function getUserValidationRules(string $identifier)
    {
        return [
            'name'       => ['required', 'string', 'max:255'],
            'age'        => ['required', 'integer', 'min:3', 'max:150'],
            'email'      => ['required', 'string', 'email', 'unique:users,email', 'max:255'],
            'newsletter' => ['nullable', 'boolean'],
            'username'   => [
                'required',
                'string',
                'alpha_dash_dot',
                'max:25',
                "unique:reserved_usernames,username,{$identifier},identifier",
                'unique:users,username',
            ],
        ];
    }

    protected static function getAvatarValidationRules()
    {
        return collect(AvatarField::create('')
            ->getValidationRules((new UserAvatar())))
            ->map(function ($values) {
                return array_merge(['required'], $values);
            })
            ->toArray();
    }


    /////////////////////////////
    /// Registration
    /////////////////////////////

    protected function createUser(array $data)
    {
        $user           = new User();
        $user->name     = $data['name'];
        $user->age      = $data['age'];
        $user->email    = $data['email'];
        $user->username = $data['username'];
        $user->password = $data['password'];
        $user->save();

        $user->setMeta(
            'notification_settings',
            array_merge(User::defaultNotificationSettings(), [
                NotificationType::WEEKLY_NEWSLETTER => $data['newsletter'],
            ]),
            'json'
        );

        return $user;
    }

    protected function registered(Request $request, $user)
    {
        event(new Registered($user));
        $this->guard()->login($user);

        $permissions = PermissionsService::getUserPermissions($user);
        $user->unsetRelation('roles'); // Removes duplicate data from response

        $this->setMessage(trans('auth.registered', ['username' => $user->username]));

        return [
            'user'             => $user,
            'csrf'             => csrf_token(),
            'user_permissions' => $permissions,
        ];
    }


    /////////////////////////////
    /// Helpers
    /////////////////////////////

    protected function resetSession()
    {
        ReservedUsername::removeReservation(
            session()->get('register.unique_key', null)
        );

        session()->forget('register');

        /// This unique key is only used for "reserving" usernames
        /// in the multi step register process
        $this->saveStep([
            'unique_key' => uniqid('', true),
            'avatar'     => $this->getAvatarItems(), // TODO - If the "shuffle" button get's implemented this could be removed.
        ]);
    }

    protected function saveStep(array $data)
    {
        session()->put('register',
            array_merge(session()->get('register', []), $data));
    }

    protected function getAvatarItems()
    {
        $items      = [];
        $default    = AvatarItem::getDefaultItems()->toArray();
        $categories = AvatarCategory::values();

        $session = session()->get('register', []);
        $ids     = array_intersect_key($session, array_flip($categories));
        $saved   = AvatarItem::query()
            ->whereIn('id', array_values($ids))
            ->get()
            ->keyBy('category');

        foreach ($categories as $category) {
            $items[$category] = optional($saved->get($category))->toArray() ?? $default[$category];
        }

        return $items;
    }
}
