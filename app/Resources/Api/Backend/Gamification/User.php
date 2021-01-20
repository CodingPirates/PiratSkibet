<?php

namespace App\Resources\Api\Backend\Gamification;

use App\Models\Forum\Thread;
use App\Models\User\User as Model;
use App\Support\Enums\ReactionType;
use App\Support\Enums\UserStatus;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Filters\Filters\EnumFilter;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Support\Contracts\Resource;

class User extends Resource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getIndexFilters())->appends([]),
            Read::create()->model($this->model)->filters($this->getReadFilters())->appends([]),
        ];
    }

    protected function getReadFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->withoutGlobalScope('default_withs');
            })
        ];
    }

    protected function getIndexFilters()
    {
        return [
            Search::create()->search([
                'name',
                'email',
                'parent_email',
                'username',
            ]),

            Filter::create()->always(function (Builder $q) {
                $q->select('id', 'username');
                $q->status(UserStatus::ACTIVE);
                $q->withoutGlobalScope('default_withs');

                // Total threads created
                $q->withCount(['threads' => function (Builder $q) {
                    $q->public(true);
                }]);

                // Total messages written
                $q->withCount(['messages' => function (Builder $q) {
                    $q->where('moderated', false);
                    $q->where('blocked_user', false);
                    $q->public(true);
                }]);

                // Total likes on messages
                $q->withCount(['messageReactions as message_likes' => function (Builder $q) {
                    $q->where('type', ReactionType::LIKE);
                    $q->whereHas('message', function (Builder $q) {
                        $q->where('moderated', false);
                        $q->where('blocked_user', false);
                        $q->public(true);
                    });
                }]);

                // Total endorsements on messages
                $q->withCount(['messageReactions as message_endorsements' => function (Builder $q) {
                    $q->where('type', ReactionType::ENDORSEMENT);
                    $q->whereHas('message', function (Builder $q) {
                        $q->where('moderated', false);
                        $q->where('blocked_user', false);
                        $q->public(true);
                    });
                }]);

                // Total projects created
                $q->withCount(['projects' => function (Builder $q) {
                    $q->public(true, true);
                    $q->published();
                }]);

                // Total projects participated
                $q->withCount(['participatingProjects' => function (Builder $q) {
                    $q->public(true, true);
                    $q->published();
                }]);

                // Total likes on owned projects
                $q->withCount(['projectReactions as project_likes' => function (Builder $q) {
                    $q->where('type', ReactionType::LIKE);
                    $q->whereHas('project', function (Builder $q) {
                        $q->public(true, true);
                        $q->published();
                    });
                }]);

                // Total endorsements on owned projects
                $q->withCount(['projectReactions as project_endorsements' => function (Builder $q) {
                    $q->where('type', ReactionType::ENDORSEMENT);
                    $q->whereHas('project', function (Builder $q) {
                        $q->public(true, true);
                        $q->published();
                    });
                }]);
            }),

            Order::create()->only([
                'username',
                'threads_count',
                'messages_count',
                'message_likes',
                'message_endorsements',
                'projects_count',
                'participating_projects_count',
                'project_likes',
                'project_endorsements',
            ])->defaultValue(['project_likes' => 'desc']),

            Pagination::create(),
        ];
    }
}
