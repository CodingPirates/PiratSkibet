<?php

namespace App\Resources\Api\Forum;

use App\Models\Forum\Thread as Model;
use App\Operations\Action;
use App\Operations\Forum\SendMessage;
use App\Operations\Moderation\RequestModeration;
use App\Support\Enums\ModerationReasons;
use MorningTrain\Laravel\Fields\Fields\Field;
use MorningTrain\Laravel\Filters\Filters\Filter;
use MorningTrain\Laravel\Filters\Filters\Order;
use MorningTrain\Laravel\Filters\Filters\Pagination;
use MorningTrain\Laravel\Filters\Filters\Search;
use MorningTrain\Laravel\Resources\Operations\Crud\Index;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use MorningTrain\Laravel\Resources\Operations\Crud\Store;
use MorningTrain\Laravel\Resources\Support\Contracts\CrudResource;

class Thread extends CrudResource
{
    protected $model = Model::class;

    public function operations()
    {
        return [
            Index::create()->model($this->model)->filters([
                Filter::create()->when('topic_id', function ($q, $topic_id) {
                    $q->where('topic_id', '=', $topic_id);
                    $q->orderBy('is_sticky', 'DESC');
                }),
                Filter::create()->always(function ($builder) {
                    $builder->public();
                    $builder->where('is_embedded', false);
                    $builder->withCount('messages');
                    $builder->with('latestMessage');
                    $builder->with('topic');
                }),
                Order::create()
                    ->only(['sort_score', 'created_at'])
                    ->scopes(['orderByActivity'])
                    ->defaultValue(['sort_score' => 'DESC']),
                Search::create()->search(['subject', 'originalMessage' => ['content']]),
                Pagination::create()->default('$per_page', 15)
            ]),
            Read::create()->model($this->model)->appends(['muted'])->filters([
                Filter::create()->always(function ($builder) {
                    $builder->public();
                }),
            ]),
            'newest' => Index::create()->model($this->model),
            'create' => Store::create()
                ->model($this->model)
                ->fields([
                    Field::create('topic_id')->validates('integer|exists:forum_topics,id'),
                    Field::create('subject')->validates('required|string'),
                    Field::create('grownups_can_participate')->validates('boolean'),
                    Field::create('type')->validates('required|in:discussion,question'),
                    Field::create('message')->validates('required|string|filled_html')->updatesAt(Field::AFTER_SAVE)->updates(function ($thread, $attribute, $content) {
                        $message = $thread->createMessage($content);

                        if ($message !== null) {
                            $thread->original_message_id = $message->id;
                            $thread->save();
                        }

                    }),
                ]),
            'send'            => SendMessage::create(),
            'toggle_mute'     => Action::create()->model($this->model)->trigger('toggleMute'),
            'toggle_sticky'   => Action::create()->model($this->model)->trigger('toggleSticky'),
            'flag'            => RequestModeration::create()->model($this->model),
            'request_removal' => RequestModeration::create()->model($this->model)
                ->successMessage('Dit indlæg er nu skjult og sendt til moderator.')
                ->validationRules([
                    'reason'  => 'required|string|in:' . ModerationReasons::REMOVAL_REQUEST,
                    'comment' => 'nullable|string',
                ]),
        ];
    }

    public function configureNewestOperation(Index $operation)
    {
        $operation->filters([
            Filter::create()->always(function ($builder) {
                $builder->public();
                $builder->where('is_embedded', false);
                $builder->orderBy('created_at', 'DESC');
            }),
            Pagination::create()->default('$per_page', 3)
        ]);
    }
}
