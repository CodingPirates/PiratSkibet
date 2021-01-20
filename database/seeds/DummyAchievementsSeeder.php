<?php

use App\Models\Achievements\Achievement;
use Illuminate\Database\Seeder;

class DummyAchievementsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Achievement::class, 25)->create();
    }
}
