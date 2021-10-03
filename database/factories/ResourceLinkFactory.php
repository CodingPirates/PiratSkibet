<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\ResourceLink;
use Faker\Generator as Faker;
use \App\Models\Course\CourseCategory;

$factory->define(ResourceLink::class, function (Faker $faker) {
    return [
        'url'                => $faker->url,
        'text'               => $faker->words($faker->numberBetween(1, 3), true),
        'course_category_id' => optional(CourseCategory::query()->inRandomOrder()->first('id'))->id,
    ];
});
