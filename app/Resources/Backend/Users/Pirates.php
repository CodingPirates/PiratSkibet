<?php

namespace App\Resources\Backend\Users;

use App\Exports\UsersExport;
use App\Operations\Excel\DownloadExcelExport;
use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Pirates extends Resource
{

    public function operations()
    {
        return [

            'index' => React::create()
                ->component('Users.Pirates.Index')
                ->path('users/pirates')
                ->title('Pirater'),

            'create' => React::create()
                ->component('Users.Pirates.Edit')
                ->path("users/pirates/create/{user?}")
                ->title('Opret pirat')
                ->parent('backend.users.pirates.index'),

            'edit' => React::create()
                ->component('Users.Pirates.Edit')
                ->path("users/pirates/edit/{user?}")
                ->title('Redigér pirat')
                ->parent('backend.users.pirates.index'),

            'download' => DownloadExcelExport::create()
                ->exportAs('BrugerStatistik.xlsx')
                ->exportable(function () {
                    return new UsersExport();
                }),
        ];
    }

}
