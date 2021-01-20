<?php

use Illuminate\Database\Seeder;
use App\Models\User\User;

class DummyPiratesSeeder extends Seeder
{
    public function run()
    {
        factory(User::class, 20)->states('pirate', 'dummy')->create();
    }
}
