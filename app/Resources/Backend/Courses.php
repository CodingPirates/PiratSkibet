<?php

namespace App\Resources\Backend;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Courses extends Resource
{
    public function operations()
    {
        return [

            'index_categories' => React::create()
                ->component('Courses.Category.Index')
                ->path('courses/categories')
                ->title('Kategorier'),

            'create_category' => React::create()
                ->component('Courses.Category.Edit')
                ->path("courses/categories/create/{course_category?}")
                ->title('Opret kategori')
                ->parent('backend.courses.index_categories'),

            'edit_category' => React::create()
                ->component('Courses.Category.Edit')
                ->path("courses/categories/edit/{course_category?}")
                ->title('Redigér kategori')
                ->parent('backend.courses.index_categories'),

            'index_courses' => React::create()
                ->component('Courses.Course.Index')
                ->path('courses/courses')
                ->title('Læringsforløb'),

            'create_course' => React::create()
                ->component('Courses.Course.Edit')
                ->path("courses/courses/create/{course?}")
                ->title('Opret læringsforløb')
                ->parent('backend.courses.index_courses'),

            'edit_course' => React::create()
                ->component('Courses.Course.Edit')
                ->path("courses/courses/edit/{course?}")
                ->title('Redigér læringsforløb')
                ->parent('backend.courses.index_courses'),

        ];
    }
}
