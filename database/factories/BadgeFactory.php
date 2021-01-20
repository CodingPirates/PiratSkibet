<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Rewards\Badge;
use Faker\Generator as Faker;

$factory->define(Badge::class, function (Faker $faker) {
    return [
        'name' => implode(' ', $faker->words(rand(1, 3))),
    ];
});
