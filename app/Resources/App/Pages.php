<?php

namespace App\Resources\App;

use App\Operations\Content\Post;
use MorningTrain\Laravel\Resources\Operations\Pages\React;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class Pages extends Resource
{

    public function operations()
    {
        return [
            'posts' => Post::create()->component('Content.Pages.Post'),
            'about' => React::create()->component('Content.Pages.About')->path('om-piratskibet'),
            'rules' => React::create()->component('Content.Pages.Rules')->path('vi-skal-vaere-gode-ved-hinanden'),
            'user_introduction' => React::create()->component('Content.Pages.User_introduction')->path('bruger-introduktion'),
            'parent_introduction' => React::create()->component('Content.Pages.Parent_introduction')->path('foraeldre-introduktion'),
            'contact' => React::create()->component('Content.Pages.Contact')->path('kontakt'),
        ];
    }

}
