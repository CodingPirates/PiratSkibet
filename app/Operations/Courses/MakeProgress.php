<?php

namespace App\Operations\Courses;

use App\Models\Course\CourseProgress;
use App\Models\Course\CourseResource;
use App\Models\Forum\Thread;
use App\Support\Enums\ResourceProgress;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class MakeProgress extends Read
{

    public function handle($res = null)
    {
        if($this->data) {

            $this->data->progress()->where('user_id', Auth::id())->delete();

            $newProgress = new CourseProgress();
            $newProgress->status = ResourceProgress::COMPLETED;
            $newProgress->user_id = Auth::id();
            $newProgress->course_id = $this->data->id;
            $newProgress->course_category_id = $this->data->category_id;
            $newProgress->save();

            return $newProgress;
        }
    }


}
