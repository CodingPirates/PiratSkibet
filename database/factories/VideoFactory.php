<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Content\Video;
use App\Support\Enums\VideoTypes;
use Faker\Generator as Faker;

$factory->define(
    Video::class,
    function (Faker $faker) {
        $date = $faker->dateTimeThisYear();

        return [
            'created_at'     => $date,
            'updated_at'     => $date,
            'video_type'     => VideoTypes::YOUTUBE,
            'is_highlighted' => $faker->boolean(15),
            'video_id'       => $faker->randomElement(
                [
                    'Y7dpJ0oseIA',
                    'https://www.youtube.com/watch?v=Y7dpJ0oseIA',
                    'https://www.youtube.com/watch?t=23&v=Y7dpJ0oseIA&feature=youtu.be',
                    'https://youtu.be/Y7dpJ0oseIA',
                    'https://youtu.be/Y7dpJ0oseIA?t=23',
                ]
            ),
        ];
    }
);
