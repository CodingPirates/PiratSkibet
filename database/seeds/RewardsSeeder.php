<?php

use App\Models\Rewards\UserTitle;
use Illuminate\Database\Seeder;

class RewardsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(UserTitle::class, 20)->create();
    }
}
