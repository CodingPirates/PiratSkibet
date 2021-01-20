<?php

namespace App\Operations\Courses;

use App\Models\Course\Course;
use App\Models\Course\CourseCategory;
use App\Models\Course\CourseResource;
use App\Models\Forum\Thread;
use App\Models\Forum\Topic;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;
use MorningTrain\Laravel\Resources\Support\Pipes\QueryModel;
use MorningTrain\Laravel\Resources\Support\Pipes\QueryToInstance;
use MorningTrain\Laravel\Resources\Support\Pipes\TransformToView;

class Breadcrumbs extends EloquentOperation
{

    const ROUTE_METHOD = 'get';

    public function __construct()
    {
        $this->filters([
            Filter::create()->when('category_id', function () {}),
            Filter::create()->when('course_id', function () {}),
            Filter::create()->when('step_id', function () {}),
        ]);
    }

    protected function beforePipes()
    {

        $request = request();

        $keyValue = '';

        if ($request->has('category_id')) {
            $this->model(CourseCategory::class);
            $keyValue = request()->get('category_id');
        }

        if ($request->has('course_id')) {
            $this->model(Course::class);
            $keyValue = request()->get('course_id');
        }

        if ($request->has('step_id')) {
            $this->model(CourseResource::class);
            $keyValue = request()->get('step_id');
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

        while ($entity !== null) {

            if($entity instanceof CourseResource) {

                $course = optional($entity->course);

                $breadcrumbs->prepend((object)[
                    'label' => optional((object)$entity->meta)->title,
                    'route' => 'app.courses.step',
                    'parameters' => [
                        'category' => optional($course->category)->slug,
                        'step' => $entity->id,
                        'course' => $course->id,
                        'course_slug' => $course->slug
                    ],
                ]);

                $entity = $entity->course;
            }

            if ($entity instanceof Course) {

                $breadcrumbs->prepend((object)[
                    'label' => $entity->title,
                    'route' => 'app.courses.course',
                    'parameters' => [
                        'category' => optional($entity->category)->slug,
                        'course' => $entity->id,
                        'course_slug' => $entity->slug
                    ],
                ]);

                $entity = $entity->category;
            }

            if ($entity instanceof CourseCategory) {

                $breadcrumbs->prepend((object)[
                    'label' => $entity->title,
                    'route' => 'app.courses.courses',
                    'parameters' => ['category' => $entity->slug],
                ]);

                $breadcrumbs->prepend((object)[
                    'label' => 'Kodehavet',
                    'route' => 'app.courses.overview',
                ]);

                $entity = null;
            }

        }

        if ($breadcrumbs->isNotEmpty()) {
            $breadcrumbs->transform(function ($breadcrumb) {
                if (isset($breadcrumb->route) && isset($breadcrumb->parameters)) {
                    $breadcrumb->url = route($breadcrumb->route, $breadcrumb->parameters);
                }
                return $breadcrumb;
            });
        }

        return $breadcrumbs;
    }


}
