<?php

namespace App\Operations\Forum;

use App\Models\Forum\Topic;
use App\Models\Forum\Thread;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;
use MorningTrain\Laravel\Resources\Support\Pipes\QueryModel;
use MorningTrain\Laravel\Resources\Support\Pipes\QueryToInstance;
use MorningTrain\Laravel\Resources\Support\Pipes\TransformToView;

class Breadcrumbs extends EloquentOperation
{

    const ROUTE_METHOD = 'get';

    protected function beforePipes()
    {

        $request = request();

        $keyValue = '';

        if ($request->has('thread_id')) {
            $this->model(Thread::class);
            $keyValue = request()->get('thread_id');
        }

        if ($request->has('topic_id')) {
            $this->model(Topic::class);
            $keyValue = request()->get('topic_id');
        }

        return [
            QueryModel::create()->model($this->model)->filters($this->filters)->operation($this),
            QueryToInstance::create()->keyValue($keyValue)->operation($this),
            TransformToView::create()->appends($this->appends),
        ];
    }

    public function handle($entity = null)
    {

        $breadcrumbs = collect();

        while($entity !== null) {

            if($entity instanceof Thread) {

                $breadcrumbs->prepend((object) [
                    'label' => $entity->subject,
                    'route' => 'app.forum.thread',
                    'parameters' => ['thread' => $entity->id],
                    'url' => route('app.forum.thread', ['thread' => $entity->id])
                ]);

                $entity = $entity->topic;

            }

            if($entity instanceof Topic) {

                $breadcrumbs->prepend((object) [
                    'label' => $entity->name,
                    'route' => 'app.forum.topic',
                    'parameters' => ['topic' => $entity->id, 'topic_slug' => $entity->slug],
                    'url' => route('app.forum.topic', ['topic' => $entity->id, 'topic_slug' => $entity->slug])
                ]);

                $entity = $entity->parent;

            }

        }

        $breadcrumbs->prepend((object) [
            'label' => 'Piratsnak',
            'route' => 'app.forum.overview',
            'parameters' => [],
            'url' => route('app.forum.overview', [])
        ]);

        return $breadcrumbs;
    }


}
