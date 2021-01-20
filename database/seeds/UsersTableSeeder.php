<?php

use App\Models\User\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run()
    {

        factory(User::class, 1)->states('admin')->create([
            'username'     => 'piratskibet@codingpirates.dk',
            'name'         => 'Piratskibet admin',
            'email'        => 'piratskibet@codingpirates.dk',
            'parent_email' => 'piratskibet@codingpirates.dk',
            'password'     => bcrypt('piratskibet'),
            'birthday'     => now()->subYears(25)->startOfDay(),
        ]);

        factory(User::class, 1)->states('admin')->create([
            'username'     => 'admin@morningtrain.dk',
            'name'         => 'Admin',
            'email'        => 'admin@morningtrain.dk',
            'parent_email' => 'admin@morningtrain.dk',
            'password'     => bcrypt('admin'),
            'birthday'     => now()->subYears(25)->startOfDay(),
        ]);

        if(app()->isLocal()) {
            factory(User::class, 3)
                ->states('predefined', 'pirate', 'all_avatar_items')
                ->create();
        }

    }
}
