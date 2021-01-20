<?php

namespace App\Operations\Forum;

use App\Events\Forum\Thread\MessageCreated;
use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use Illuminate\Support\Facades\Auth;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;
use MorningTrain\Laravel\Resources\Support\Pipes\Validates;
use MorningTrain\Laravel\Resources\Support\Traits\HasRules;

class SendMessage extends EloquentOperation
{
    use HasRules;

    const ROUTE_METHOD = 'post';

    public function __construct()
    {
        $this->model(Thread::class);
        $this->rules([
            'message' => 'required|string|filled_html',
        ]);
    }

    protected function beforePipes()
    {
        return array_merge([
            Validates::create()->rules($this->rules),
        ], parent::beforePipes());
    }

    public function handle($thread = null)
    {
        /// Check if the user created another message less than 30 seconds ago - if, then abort
        $lastMessage = Message::query()->forUser(Auth::user())->orderBy('created_at', 'desc')->first();
        if ($lastMessage !== null) {
            $seconds_since = $lastMessage->created_at->diffInSeconds(now(), true);
            if($seconds_since < 30) {
                $this->badRequest('Du kan ikke sende flere beskeder så hurtigt efter hinaden. Prøv igen om ' . (30 - $seconds_since) . ' sekunder');
            }
        }

        $message = $thread->createMessage(request()->input('message'));

        event(new MessageCreated($message));

        return $message;
    }


}
