<?php

namespace App\Resources\Api;


use App\Events\User\NotificationRead;
use App\Support\Enums\NotificationStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Notifications\DatabaseNotification as Model;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Resources\Operations\Action;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Count;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Notification extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters($this->getFilters()),
            'count' => Count::create()->model($this->model)->filters($this->getFilters()),
            'markAsRead' => Action::create()
                ->model($this->model)
                ->trigger(function (Model $notification) {
                    $notification->markAsRead();
                    event(new NotificationRead($notification));
                }),
        ];
    }

    public function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $user = Auth::user();

                $q->orderBy('updated_at', 'DESC');
                $q->where('notifiable_type', get_class($user));
                $q->where('notifiable_id', $user->id);
                $q->where(function ($q) {
                    return $q->where('data->status', '<>', NotificationStatus::DISABLED)
                        ->orWhereNull('data->status');
                });
            }),

            Filter::create()->when('unread', function (Builder $q, $unred) {
                return $q->whereNull('read_at');
            }),

            Pagination::create(),
        ];
    }
}
