<?php

namespace App\Http\View\Composers;


use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Models\User\User;
use App\Notifications\Forum\MessageReaction;
use App\Notifications\Forum\NewMessage;
use App\Support\Enums\NotificationStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Collection;
use Illuminate\View\View;

class ThreadActivitySummaryComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view): void
    {
        $user = $view->getData()['user'] ?? null;

        if (!$user || !$user instanceof User) {
            return;
        }

        $view->with($this->getViewData(
            $this->getThreads($this->getNotifications($user)),
            $user
        ));
    }

    private function getNotifications(User $user): Collection
    {
        return $user->notifications()
            ->whereNull('read_at')
            ->where(static function ($q) {
                $q->where('data->status', '<>', NotificationStatus::DISABLED);
                $q->orWhereNull('data->status');
            })
            ->whereIn('type', [
                MessageReaction::class,
                NewMessage::class,
            ])
            ->get()
            ->groupBy('type');
    }

    private function getThreads(Collection $notifications): Collection
    {
        return Thread::query()
            ->public()
            ->where('is_embedded', false)
            ->where(static function (Builder $q) use ($notifications) {
                $q->whereIn('id',
                    optional($notifications->get(NewMessage::class))->pluck('data.thread_id') ?? []
                );
                $q->orWhereIn('original_message_id',
                    optional($notifications->get(MessageReaction::class))->pluck('data.message_id') ?? []
                );
            })
            ->orderBy('sort_score', 'desc')
            ->get();
    }

    private function getViewData(Collection $threads, User $user): array
    {
        return array_filter([
            'threadHighlight' => $this->getThreadHighlight($threads->first(), $user),
            'threadSummary'   => $this->getThreadSummary($threads),
        ]);
    }

    private function getThreadHighlight(?Thread $thread, User $user): ?string
    {
        if ($thread === null) {
            return null;
        }

        $participants = $this->getThreadParticipants($thread, $user);
        $reacters     = $this->getMessageReacters($thread->originalMessage);
        $all          = $participants->union($reacters);

        $count    = $all->count() - 1;
        $username = $all->first();
        $actions  = implode(' og ', array_filter([
            $reacters->count() > 0 ? 'liket' : null,
            $participants->count() > 0 ? 'kommenteret på' : null,
        ]));

        return trans_choice('emails.weekly_newsletter.threads_highlight', $count, [
            'actions' => $actions,
            'user'    => $username,
            'link'    => route('app.forum.thread', [
                'thread' => $thread->id,
            ]),
        ]);
    }

    private function getThreadParticipants(Thread $thread, User $user): Collection
    {
        return $thread->messages()
            ->where('user_id', '<>', $user->id)
            ->with('user:id,username')
            ->latest()
            ->get()
            ->pluck('user.username', 'user.id');
    }

    private function getMessageReacters(?Message $message): Collection
    {
        if (!$message) {
            return collect();
        }

        return $message->reactions()
            ->endorsement(false)
            ->with('user:id,username')
            ->latest()
            ->get()
            ->pluck('user.username', 'user.id');
    }

    private function getThreadSummary(Collection $threads): ?string
    {
        $count = $threads->count() - 1;

        if ($count < 1) {
            return null;
        }

        return trans_choice('emails.weekly_newsletter.threads_summary', $count);
    }
}
