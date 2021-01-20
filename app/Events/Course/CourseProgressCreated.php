<?php

namespace App\Events\Course;

use App\Models\Course\CourseProgress;
use Illuminate\Queue\SerializesModels;

class CourseProgressCreated
{
    use SerializesModels;

    public $courseProgress;

    /**
     * Create a new event instance.
     *
     * @param CourseProgress $progress
     */
    public function __construct(CourseProgress $progress)
    {
        $this->courseProgress = $progress;
    }
}
