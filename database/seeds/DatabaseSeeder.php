<?php

use Illuminate\Database\Seeder;
use MorningTrain\Laravel\Permissions\Database\Seeds\DatabaseSeeder as PermissionSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            PermissionSeeder::class,
            AvatarItemsTableSeeder::class,
            ZipcodeSeeder::class,
            CourseCategorySeeder::class,
            ForumCategorySeeder::class,
            ProjectCategorySeeder::class,
            AnimatedTickerTextSeeder::class,
            TwitchChannelsSeeder::class,
            UsersTableSeeder::class,
        ]);

        if(app()->isLocal()) {
            $this->call([
                DummyRegionSeeder::class,
                RewardsSeeder::class,
                DummyAchievementsSeeder::class,
                DummyPiratesSeeder::class,
                demoNewsSeeder::class,
                ForumTestSeeder::class,
                CourseDummySeeder::class,
                EventSeeder::class,
                DummyProjectSeeder::class,
                VideoSeeder::class,
                LivestreamSeeder::class,
            ]);
        }

    }
}
