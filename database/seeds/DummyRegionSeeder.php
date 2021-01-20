<?php

use App\Models\Regions\Region;
use Illuminate\Database\Seeder;

class DummyRegionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Region::class, 10)->create();
    }
}
