<?php

namespace App\Resources\App;

use App\Models\Projects\Project;
use App\Operations\Files\Download;
use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Projects extends Resource
{

    public function operations()
    {
        return [
            'overview' => React::create()
                ->component('Projects.Overview')
                ->path('showcase')
                ->title('Showcases'),

            'create' => React::create()
                ->component('Projects.Edit')
                ->path('showcase/projekt/opret')
                ->title('Opret Showcase')
                ->parent('app.projects.overview'),

            'edit' => React::create()
                ->component('Projects.Edit')
                ->path('showcase/projekt/rediger/{project}')
                ->title('Rediger Showcase')
                ->parent('app.projects.overview'),

            'project' => React::create()
                ->component('Projects.Project')
                ->path('showcase/projekt/{project}')
                ->title('Showcase')
                ->parent('app.projects.overview'),

            Download::create()->model(Project::class)->from('files')
        ];
    }

}
