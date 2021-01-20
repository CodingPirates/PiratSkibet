<?php

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

$factory->define(\App\Models\Course\CourseResource::class, function (Faker $faker) {

    $type = $faker->randomElement(array('video', 'step', 'text', 'questionnaire'));

    $meta = '{}';

    if($type === 'video') $meta = json_encode(array('title' => $faker->word,'link' => 'https://www.youtube.com/watch?v=ecC5FrJQUek'));
    if($type === 'questionnaire') $meta = json_encode(array('questions' => array('q' => $faker->text(), 'a' => $faker->word(), 'options' => array($faker->word, $faker->word))));
    if($type === 'text') $meta = json_encode(array('text' => $faker->paragraphs()));
    if($type === 'step') $meta = json_encode(array('title' => $faker->word(), 'text' => $faker->text()));

    return [
        'course_id'     => $faker->biasedNumberBetween(1, 20),
        'position'      => $faker->biasedNumberBetween(1, 20),
        'type'          => $type,
        'meta'          => $meta,
    ];
});
