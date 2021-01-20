<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Models\Achievements\Achievement;
use App\Models\Achievements\AchievementItem;
use App\Models\Avatar\AvatarItem;
use App\Models\Rewards\UserTitle;
use Faker\Generator as Faker;

$factory->define(Achievement::class, function (Faker $faker) {
    return [
        'name'        => implode(' ', $faker->words(rand(1, 3))),
        'description' => $faker->text(180),
    ];
});


$factory->afterCreating(Achievement::class, function (Achievement $achievement, Faker $faker) {
    collect([
            AvatarItem::query()->take(20),
            UserTitle::query(),
        ])
        ->each(function ($query) use ($achievement) {
            $reward = $query->inRandomOrder()->first();

            $item            = new AchievementItem();
            $item->item_id   = $reward->id;
            $item->item_type = get_class($reward);

            $achievement->achievementItems()->save($item);
        });
});
