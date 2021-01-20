<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Achievements\Achievement;
use App\Models\Avatar\AvatarItem;
use App\Models\Regions\Zipcode;
use App\Models\Rewards\UserTitle;
use App\Models\User\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

//////////////////////////
/// Model Definition
//////////////////////////

$factory->define(User::class, function (Faker $faker) {
    return [
        'name'              => $faker->name,
        'username'          => $faker->userName,
        'email'             => $faker->unique()->safeEmail,
        'parent_email'      => $faker->safeEmail,
        'password'          => bcrypt('password'),
        'description'       => '<p>' . implode('</p><p>', $faker->paragraphs(3)) . '</p>',
        'age'               => $faker->numberBetween(7, 13),
        'birthday'          => $faker->dateTimeBetween('-13 years', '-7 years'),
        'remember_token'    => Str::random(10),
        'email_verified_at' => now(),
    ];
});

$factory->state(User::class, 'predefined', function (Faker $faker) {
    static $nr = 0;
    $nr++;

    return [
        "username"     => "pirat{$nr}",
        "name"         => "Pirat {$nr}",
        "email"        => "pirat{$nr}@morningtrain.dk",
        "parent_email" => "pirat{$nr}_parent@morningtrain.dk",
        "password"     => bcrypt("pirat{$nr}"),
    ];
});

// All Users Get this
$factory->afterCreating(User::class, function (User $user, Faker $faker) {
    $zipcodes = Zipcode::getAll()->pluck('zipcode');

    $user->setMeta('zipcode', $zipcodes->random(), 'int');
});


//////////////////////////
/// Role States
//////////////////////////

$factory->afterCreatingState(User::class, 'admin', function (User $user, Faker $faker) {
    $user->assignRole('admin');
});

$factory->afterCreatingState(User::class, 'pirate', function (User $user, Faker $faker) {
    $user->assignRole('pirate');
});


//////////////////////////
/// Other States
//////////////////////////

$factory->afterCreatingState(User::class, 'all_avatar_items', function (User $user, Faker $faker) {
    $user->rewardItems()->createMany(
        AvatarItem::pluck('id')->map(function ($id) {
            return [
                'item_id'   => $id,
                'item_type' => AvatarItem::class,
            ];
        })
    );
});

$factory->afterCreatingState(User::class, 'dummy', function (User $user, Faker $faker) {
    $user->randomModerationRequest($faker);

    Achievement::inRandomOrder()
        ->limit(rand(0, 10))->get()
        ->each->grantAchievement($user);

    $user->rewards()
        ->inRandomOrder()
        ->limit($faker->biasedNumberBetween(0, 10))->get()
        ->each->open();

    $title = $user->rewardItems()
        ->whereItemType(UserTitle::class)
        ->with('item')
        ->inRandomOrder()
        ->first();

    if ($title !== null) {
        $user->selectTitle($title->item);
    }
});
