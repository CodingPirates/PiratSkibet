<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Events\Event;
use App\Models\Regions\Region;
use App\Support\Enums\EventStatus;
use Carbon\Carbon;
use Faker\Generator as Faker;

$factory->define(Event::class,
    function (Faker $faker) {
        $start_date = $faker->dateTimeBetween(now()->subMonths(1), now()->addMonths(2));
        $start      = Carbon::instance($start_date);

        return [
            'title'       => $faker->sentence(),
            'link'        => $faker->url,
            'img'         => asset('img/favicon/apple-touch-icon.png'),
            'description' => $faker->paragraph(),
            'status'      => $faker
                ->optional(0.25, EventStatus::PUBLISHED) // favor PUBLISHED 75% of the time
                ->randomElement(array_values(array_diff(EventStatus::values(), [EventStatus::PUBLISHED]))),

            'start_at' => $start_date,
            'end_at'   => $faker->dateTimeBetween(
                $start->clone()->addHours(rand(1, 2)),
                $start->clone()->addHours(rand(3, 48))
            ),

            'publish_at' => $start->clone()->subDays(rand(30, 90)),
        ];
    });


$factory->afterCreating(Event::class,
    function (Event $event, Faker $faker) {
        $regions = Region::query()
            ->inRandomOrder()
            ->limit(rand(1, 5))
            ->pluck('id');

        $event->regions()->sync($regions);
    });
