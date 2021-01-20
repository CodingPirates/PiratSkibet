<?php

namespace App\Operations\Content;

use MorningTrain\Laravel\Resources\Operations\Pages\React;

class Post extends React
{
    protected $openGraphMeta;

    public function __construct()
    {
        $this->path('pages/{path}');
    }

    public function handle($model = null)
    {

        $path = request()->route()->parameter('path');

        $post = \App\Models\Content\Post::query()->visible()->wherePath($path)->first();

        if($post === null) {
            return abort(404);
        }

        $this->openGraphMeta = $post->openGraphMeta;

        return parent::handle($model);
    }

    public function getPageEnvironment()
    {
        return array_merge(
            parent::getPageEnvironment(),
            [
                'og' => $this->openGraphMeta,
            ]
        );
    }

}
