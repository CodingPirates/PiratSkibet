<?php

use App\Models\Content\Livestream;
use Illuminate\Database\Seeder;

class LivestreamSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Livestream::class, 10)->create();
    }
}
