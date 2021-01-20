<?php

namespace App\Mail\User;

use App\Models\User\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class WeeklyNewsletter extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /**
     * @var User
     */
    public $user;

    public $greeting;
    public $footerContent;

    public $projects = [];
    public $courses  = [];
    public $streams  = [];

    /**
     * Create a new message instance.
     *
     * @param User $user
     * @param Collection $projects
     * @param Collection $courses
     * @param Collection $streams
     */
    public function __construct(User $user, Collection $projects, Collection $courses, Collection $streams)
    {
        $this->user     = $user;
        $this->projects = $this->makeTable($projects);
        $this->courses  = $this->makeTable($courses);
        $this->streams  = $this->makeTable($streams);

        $this->onQueue('emails');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $this->greeting      = trans('emails.weekly_newsletter.greeting');
        $this->footerContent = trans('emails.weekly_newsletter.unsubscribe')
            . PHP_EOL . PHP_EOL
            . trans('emails.weekly_newsletter.questions')
            . PHP_EOL . PHP_EOL;

        return $this->markdown('emails.user.weekly-newsletter')
            ->subject(__('emails.weekly_newsletter.subject'));
    }

    private function makeTable($items)
    {
        return collect($items)
            ->map(static function ($item) {
                return [
                    'header' => "[![{$item['alt']}]({$item['img']})]({$item['link']})",
                    'split'  => ":--------------------------------------------------:",
                    'row'    => "[{$item['title']}]({$item['link']})",
                ];
            })
            ->pipe(static function ($collection) {
                return [
                    '|' . $collection->implode('header', '|') . '|',
                    '|' . $collection->implode('split', '|') . '|',
                    '|' . $collection->implode('row', '|') . '|',
                ];
            });
    }
}
