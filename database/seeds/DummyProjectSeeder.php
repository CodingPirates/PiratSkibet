<?php

use App\Models\Projects\Project;
use Illuminate\Database\Seeder;

class DummyProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Project::flushEventListeners();
        factory(Project::class, 30)->create();
    }
}
