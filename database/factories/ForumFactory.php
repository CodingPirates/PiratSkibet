<?php

use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use Faker\Generator as Faker;
use App\Models\User\User;

$factory->define(Message::class, function (Faker $faker) {

    $pirates = \Illuminate\Support\Facades\Cache::store('array')->rememberForever('all_pirates', function(){
        return User::query()->role('pirate')->get()->keyBy('id');
    });

    $content_values = [
        $faker->paragraph(),
        $faker->paragraph(5),
        "<p>Aut nisi consectetur cumque eligendi. Sit possimus soluta ea ab sed esse officia. Provident ipsa qui repudiandae repudiandae sapiente sed voluptatem.</p><p><br></p><p><span class=\"ql-tenorblot\" data-id=\"5074481\" data-src=\"https://media.tenor.com/images/72c73b1f2b68e8c1a1cdcd1d8cb20b39/tenor.gif\">﻿<span contenteditable=\"false\"><img src=\"https://media.tenor.com/images/72c73b1f2b68e8c1a1cdcd1d8cb20b39/tenor.gif\"></span>﻿</span></p>",
        "<p><span style=\"color: rgb(0, 0, 0);\">Etiam ligula odio, dapibus eu felis at, elementum rutrum lorem. Mauris tincidunt diam sed purus cursus mattis. Proin dignissim dui sit amet consectetur pharetra. Vestibulum ut enim quis enim pulvinar ullamcorper non sed metus. Etiam placerat sit amet nisl et maximus. </span></p><p><span style=\"color: rgb(0, 0, 0);\">Quisque eleifend sagittis commodo. Vivamus at eleifend est, ac porttitor turpis. Etiam in mi massa. Nunc imperdiet consectetur massa. Donec iaculis justo in tincidunt euismod. Morbi eget magna purus. Quisque at dapibus libero. Curabitur nec erat luctus, dapibus sapien vel, molestie tortor.</span></p><p><span class=\"ql-tenorblot\" data-id=\"5701246\" data-src=\"https://media.tenor.com/images/51a86b2115cd75b972f9bc933fec39cc/tenor.gif\">﻿<span contenteditable=\"false\"><img src=\"https://media.tenor.com/images/51a86b2115cd75b972f9bc933fec39cc/tenor.gif\"></span>﻿</span>Consectetur non qui ab nihil praesentium. Consectetur cupiditate dolor sequi rerum omnis qui. Amet repudiandae et quod. Qui cum vel explicabo sit molestiae.</p>",
        $faker->paragraphs(3, true),
        $faker->paragraphs(1, true),
    ];

    return [
        'content' => $content_values[array_rand($content_values)],
        'created_at' => $faker->dateTime,
        'user_id' => $pirates->random()->id
    ];
});

$factory->afterCreating(Message::class, function (Message $message, Faker $faker) {
    $message->randomModerationRequest($faker);
});

$factory->define(\App\Models\Forum\Topic::class, function (Faker $faker) {
    return [
        'name' => $faker->sentence,
        'slug' => $faker->slug,
        'description' => $faker->text(200)
    ];
});

$factory->define(Thread::class, function (Faker $faker) {
    return [
        'subject' => $faker->sentence(5, true)
    ];
});

$factory->afterCreating(Thread::class, function (Thread $thread, Faker $faker) {
    $thread->randomModerationRequest($faker);
});
