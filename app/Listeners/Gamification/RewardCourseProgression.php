<?php

namespace App\Listeners\Gamification;

use App\Events\Course\CourseProgressCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class RewardCourseProgression implements ShouldQueue
{
    use InteractsWithQueue;

    public $queue = 'events';

    /**
     * Handle the event.
     *
     * @param  CourseProgressCreated  $event
     * @return void
     */
    public function handle(CourseProgressCreated $event)
    {
        $progress = $event->courseProgress;

        if (!$progress->completed || !$progress->user || !$progress->course || !$progress->course->achievement) {
            return;
        }

        $progress->course->achievement->grantAchievement($progress->user);
    }
}
