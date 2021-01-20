<?php

namespace App\Resources\App;

use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Courses extends Resource
{

    public function operations()
    {
        return [
            'overview' => React::create()
                ->component('Courses.Overview')
                ->path('kodehavet'),
            'courses' => React::create()
                ->component('Courses.Courses')
                ->path('kodehavet/{category}'),
            'course' => React::create()
                ->component('Courses.Course')
                ->path('kodehavet/{category}/{course}/{course_slug}'),
            'step' => React::create()
                ->component('Courses.Step')
                ->path('kodehavet/{category}/{course}/{course_slug}/{step}')
        ];
    }

}
