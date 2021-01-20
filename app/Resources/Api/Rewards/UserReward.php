<?php

namespace App\Resources\Api\Rewards;

use App\Models\Rewards\UserReward as Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Resources\Operations\Action;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class UserReward extends CrudResource
{
    protected $model      = Model::class;

    public function operations()
    {
        return [
            Index::create()
                ->model($this->model)
                ->filters($this->getFilters()),

            'opened' => Index::create()
                ->model($this->model)
                ->filters([
                    Filter::create()->when('user')->scope('forUser'),
                    Filter::create()->when('type')->scope('hasItemType'),
                    Filter::create()->always(function (Builder $q) {
                        $q->opened(true);
                        $q->with([
                            'rewardItems' => function($q){
                                $q->with('item');
                                $q->forUser(request()->get('user', Auth::id()));
                                if(request()->has('type')) {
                                    $q->isOfType(request()->get('type'));
                                }
                            }
                        ]);
                        $q->whereHas('rewardItems', function ($q) {
                            $q->forUser(request()->get('user', Auth::id()));
                            if(request()->has('type')) {
                                $q->isOfType(request()->get('type'));
                            }
                        });
                        $q->orderBy('created_at', 'DESC');
                    }),
                ]),

            'open' => Action::create()
                ->model($this->model)
                ->filters($this->getFilters())
                ->trigger('open'),
        ];
    }

    protected function getFilters()
    {
        return [
            Filter::create()->always(function (Builder $q) {
                $q->forUser(); // <- If you remove this, add a Model Policy instead
                $q->opened(false);
            }),
        ];
    }
}
