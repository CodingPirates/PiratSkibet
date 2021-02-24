<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Content\Livestream;
use App\Support\Enums\LivestreamTypes;
use Faker\Generator as Faker;

$factory->define(
    Livestream::class,
    function (Faker $faker) {
        $date = $faker->dateTimeThisYear();
        $type = $faker->randomElement(LivestreamTypes::all());

        return [
            'created_at'    => $date,
            'updated_at'    => $date,
            'type'          => $type,
            'is_live'       => false,
            'livestream_id' => $type === LivestreamTypes::YOUTUBE_CHANNEL ?
                $faker->uuid :
                $faker->randomElement(
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
