<?php

namespace App\Resources\Api\Forum;

use App\Models\Forum\Message as Model;
use App\Models\Forum\MessageChange;
use App\Operations\Action;
use App\Operations\Interactions\Reaction;
use App\Operations\Moderation\RequestModeration;
use App\Support\Enums\ModerationReasons;
use App\Support\Enums\ReactionType;
use Illuminate\Database\Eloquent\Builder;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Delete;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Message extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters(array_merge(
                [
                    Filter::create()->always(function ($q) {
                        $q->isNormalMessage();
                    }),
                ],
                $this->getFilters(),
                [
                    Pagination::create()->default('$per_page', 5)->default('$page', request()->get('$page', 1)),
                ]
            )),
            Read::create()->model($this->model)->filters($this->getFilters()),
            Store::create()->model($this->model)->fields($this->getFields()),
            Delete::create()->model($this->model),
            'changes' => Index::create()->model(MessageChange::class)->filters([
                Filter::create()->always(function ($q) {
                    $q->orderBy('created_at', 'ASC');
                }),
                Filter::create()->when('message_id', function ($q, $message_id) {
                    $q->where('message_id', $message_id);
                }),
            ]),
            'accept'          => Action::create()->model($this->model)->trigger('accept'),
            'like'            => Reaction::create()->type(ReactionType::LIKE)->model($this->model),
            'endorse'         => Reaction::create()->type(ReactionType::ENDORSEMENT)->model($this->model),
            'flag'            => RequestModeration::create()->model($this->model),
            'request_removal' => RequestModeration::create()->model($this->model)
                ->successMessage('Dit indlæg er nu skjult og sendt til moderator.')
                ->validationRules([
                    'reason'  => 'required|string|in:' . ModerationReasons::REMOVAL_REQUEST,
                    'comment' => 'nullable|string',
                ]),
        ];
    }

    public function getFilters()
    {
        return [
            Filter::create()->when('thread_id', function (Builder $builder, $thread_id) {
                $builder->where('thread_id', '=', $thread_id);
            }),
            Filter::create()->always(function (Builder $builder) {
                $builder->with('thread:id,created_by,type,status'); // Need 'status' for permission checks
                $builder->public();
                $builder->orderBy('created_at', 'ASC');
                $builder->withCount('likes');
                $builder->withCount('my_likes');
                $builder->withCount('changes');
                $builder->with('user:id,username,user_avatar_id,title_id,deleted_at'); // Need 'deleted_at', for showing blocked users
            }),
            Search::create()->search(['message' => ['content']]),
        ];
    }

    public function getFields()
    {
        return [
            Field::create('content')->validates('required|string|filled_html'),
        ];
    }

}
