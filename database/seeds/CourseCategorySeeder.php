<?php

use Illuminate\Database\Seeder;
use MorningTrain\Laravel\Fields\Files\Models\File;

class CourseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categoryOne = factory(\App\Models\Course\CourseCategory::class, 1)->create([
            'title' => 'Scratch',
            'description' => 'Scratch er et gratis værktøj, som du kan bruge til at programmere dine egne interaktive historier, spil og tegnefilm. Hvis du aldrig har prøvet at programmere før, er Scratch et rigtig godt sted at starte, da Scratch er meget begyndervenligt.',
            'color' => '#f9d12b',
            'logo_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/logos/scratch.png')->id;
            },
            'thumbnail_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/course-placeholder.png')->id;
            },
        ]);

        $categoryOne->first()->resourceLinks()->createMany(
            factory(\App\Models\ResourceLink::class, 3)->make()->toArray()
        );

        $categoryTwo = factory(\App\Models\Course\CourseCategory::class, 1)->create([
            'title' => 'Javascript via p5.js',
            'description' => 'p5.js er et JavaScript-bibliotek, der gør kodning let og tilgængelig for børn og unge, der interesserer sig for at kodning inden for design.',
            'color' => '#F7DF1E',
            'logo_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/logos/javascript.svg')->id;
            },
            'thumbnail_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/course-placeholder2.png')->id;
            },
        ]);

        $categoryTwo->first()->resourceLinks()->createMany(
            factory(\App\Models\ResourceLink::class, 1)->make()->toArray()
        );

        $categoryThree = factory(\App\Models\Course\CourseCategory::class, 1)->create([
            'title' => 'Processing.py',
            'color' => '#006673',
            'active' => false,
            'logo_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/logos/processing.png')->id;
            },
            'thumbnail_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/course-placeholder2.png')->id;
            },
        ]);

        $categoryThree->first()->resourceLinks()->createMany(
            factory(\App\Models\ResourceLink::class, 2)->make()->toArray()
        );

        factory(\App\Models\Course\CourseCategory::class, 1)->create([
            'title' => 'HTML/CSS',
            'description' => 'HTML og CSS er de to kode-sprog, som ligger bag enhver moderne hjemmeside. HTML og CSS sørger for, at tekst, billeder, design osv. ser flot ud i internetbrowseren.',
            'color' => '#007b51',
            'logo_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/logos/html-css.svg')->id;
            },
            'thumbnail_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/course-placeholder.png')->id;
            },
        ]);

        factory(\App\Models\Course\CourseCategory::class, 1)->create([
            'title' => 'Sonic Pi',
            'color' => '#00268a',
            'active' => false,
            'logo_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/logos/sonic-pi.svg')->id;
            },
            'thumbnail_id' => function (array $category) {
                return File::createFromStorage('public', 'courses/course-placeholder2.png')->id;
            },
        ]);

    }
}
