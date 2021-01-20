<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Projects\Category;
use App\Models\Projects\Project;
use App\Models\User\User;
use App\Support\Enums\GenericStatus;
use Faker\Generator as Faker;

$factory->define(Project::class, function (Faker $faker) {
    return [
        'owner_id'    => User::query()->inRandomOrder()->first('id')->id,
        'title'       => $faker->sentence,
        'description' => $faker->paragraph,
        'status'      => $faker
            ->optional(0.25, GenericStatus::PUBLISHED)// favor PUBLISHED 75% of the time
            ->passthrough(GenericStatus::DRAFT),

        'sort_score'  => $faker->numberBetween(60, 100),
    ];
});

$factory->afterCreating(Project::class,
    function (Project $project, Faker $faker) {
        // Add categories
        $categories = Category::query()->parent(false)->pluck('id');

        $project->categories()->sync($categories->random(random_int(1, 4))->all());



        $all_users = User::query()->where('id', '<>', $project->user_id)->pluck('id')->shuffle();
        $members   = $all_users->splice(0, random_int(1, 4)); // Ensuring owners and contributors won't have reactions to their own project
        $reactions = $all_users->random(random_int(0, 10));


        // Add users
        $members = $members->mapWithKeys(function ($id, $index) use ($faker) {
            return [$id => ['accepted' => $faker->boolean(65)]];
        });

        $project->members()->sync($members);



        // Create reactions
        $reactions = $reactions->map(function ($id) {
            return ['user_id' => $id];
        });

        $project->reactions()->createMany($reactions->all());

        $project->seedThread();

    });
