<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Rewards\UserTitle;
use Faker\Generator as Faker;

$factory->define(UserTitle::class, function (Faker $faker) {
    return [
        'title' => implode(' ', $faker->words(rand(1, 3))),
    ];
});
