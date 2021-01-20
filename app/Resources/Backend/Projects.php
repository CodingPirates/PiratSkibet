<?php

namespace App\Resources\Backend;


use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Projects extends Resource
{
    public function operations()
    {
        return [

            'index_categories' => React::create()
                ->component('Projects.Categories.Index')
                ->path('projects/categories')
                ->title('Kategorier'),

            'create_category'  => React::create()
                ->component('Projects.Categories.Edit')
                ->path("projects/categories/create/{category?}")
                ->title('Opret kategori')
                ->parent('backend.projects.index_categories'),

            'edit_category'  => React::create()
                ->component('Projects.Categories.Edit')
                ->path("projects/categories/edit/{category?}")
                ->title('Redigér kategori')
                ->parent('backend.projects.index_categories'),

        ];
    }
}
