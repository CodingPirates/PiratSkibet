<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Course\CourseCategory;
use Faker\Generator as Faker;
use Illuminate\Support\Str;
use MorningTrain\Laravel\Fields\Files\Models\File;

$factory->define(CourseCategory::class, function (Faker $faker) {

    return [
        'title'        => $faker->words(rand(1, 3), true),
        'description'  => '<p>' . implode('</p><p>', $faker->paragraphs(3)) . '</p>',
        'color'        => $faker->hexcolor,
        'logo_id'      => factory(File::class)->state('randomImage'),
        'thumbnail_id' => factory(File::class)->state('randomImage'),
    ];
});

$factory->afterMaking(CourseCategory::class, function ($category, $faker) {
    $category->slug = Str::slug($category->title, '_');
});
