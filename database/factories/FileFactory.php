<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use MorningTrain\Laravel\Fields\Files\Models\File;
use Faker\Generator as Faker;

$factory->define(File::class, function (Faker $faker) {
    return [
        'name'        => $faker->word,
        'uuid'        => $faker->uuid,
        'disk'        => config('filepond.disk', 'local'),
        'location'    => config('filepond.location', 'filepond'),
//        'extension'   => '',
//        'description' => '',
//        'type'        => '',
//        'mime'        => '',
//        'size'        => '',
//        'meta'        => '',
    ];
});

$factory->afterMakingState(File::class, 'randomImage', function ($file, $faker) {

    $image = $faker->image($file->storage->path($file->location), 640, 480, null, false);

    $parts = explode('.', $image);

    $file->extension = array_pop($parts);
    $file->uuid = join('.', $parts);
});
