<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Regions\Region;
use App\Models\Regions\Zipcode;
use Faker\Generator as Faker;
use Illuminate\Support\Facades\Cache;

$factory->define(Region::class, function (Faker $faker) {
    return [
        'name' => $faker->kommune,
    ];
});

$factory->afterCreating(Region::class, function (Region $region) {

    $zipcodes = Zipcode::getAll()->pluck('zipcode');

    $region->zipcodes()->sync($zipcodes->random(random_int(0, 30))->all());
});
