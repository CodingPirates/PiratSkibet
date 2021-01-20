<?php

namespace App\Http\View\Composers;


use App\Models\Projects\Project;
use App\Models\User\User;
use App\Notifications\Projects\ProjectReaction;
use App\Support\Enums\GenericOrderType;
use App\Support\Enums\NotificationStatus;
use Illuminate\Support\Collection;
use Illuminate\View\View;

class ProjectActivitySummaryComposer
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
            $this->getProjects($this->getNotifications($user))
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
                ProjectReaction::class,
            ])
            ->get()
            ->pluck('data');
    }

    private function getProjects(Collection $notifications): Collection
    {
        return Project::query()
            ->whereIn('id', $notifications->pluck('project_id')->filter())
            ->{GenericOrderType::MOST_POPULAR}()
            ->get();
    }

    private function getViewData(Collection $projects): array
    {
        return array_filter([
            'projectHighlight' => $this->getProjectHighlight($projects->first()),
            'projectSummary'   => $this->getProjectsSummary($projects),
        ]);
    }

    private function getProjectHighlight(?Project $project): ?string
    {
        if ($project === null) {
            return null;
        }

        $count    = $project->reactions()->endorsement(false)->count() - 1;
        $username = $project->reactions()
            ->endorsement(false)
            ->latest()
            ->first()->user->username;

        return trans_choice('emails.weekly_newsletter.projects_highlight', $count, [
            'user'    => $username,
            'project' => $project->title,
            'link'    => route('app.projects.project', [
                'project' => $project->id
            ]),
        ]);
    }

    private function getProjectsSummary(Collection $projects): ?string
    {
        $count = $projects->count() - 1;

        if ($count < 1) {
            return null;
        }

        return trans_choice('emails.weekly_newsletter.projects_summary', $count);
    }
}
