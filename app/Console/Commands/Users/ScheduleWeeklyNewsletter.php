<?php

namespace App\Console\Commands\Users;

use App\Mail\User\WeeklyNewsletter;
use App\Models\Course\Course;
use App\Models\Projects\Project;
use App\Models\User\User;
use App\Support\Enums\NotificationType;
use Facades\App\Support\Services\Twitch;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use stdClass;

class ScheduleWeeklyNewsletter extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:schedule-weekly-newsletter';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Schedules a job for sending the weekly newsletter';

    protected $key = NotificationType::WEEKLY_NEWSLETTER;

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $projects = Project::getNewsletterHiglights(3);
        $courses  = Course::getNewsletterHiglights(3);
        $streams  = Twitch::getLatestVideos(config('services.twitch.user_id'), 3)
            ->map(static function (stdClass $video) {
                return [
                    'title' => $video->title,
                    'alt'   => $video->title,
                    'img'   => preg_replace_array('/%{[width|height]+}/', ['160', '90'], $video->thumbnail_url),
                    'link'  => $video->url,
                ];
            });

        User::query()
            ->whereHas('metaAttributes', function ($q) {
                $q->where('name', 'notification_settings')->where("value->{$this->key}", true);
            })
            ->get()
            ->each(static function (User $user) use ($streams, $courses, $projects) {
                Mail::to($user)->send(new WeeklyNewsletter($user, $projects, $courses, $streams));
            });
    }
}
