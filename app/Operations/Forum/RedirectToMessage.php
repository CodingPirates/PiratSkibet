<?php

namespace App\Operations\Forum;

use App\Models\Forum\Message;
use App\Models\Moderation\ModerationCase;
use MorningTrain\Laravel\Resources\Support\Contracts\PageOperation;

class RedirectToMessage extends PageOperation
{

    const ROUTE_METHOD = 'get';

    public function __construct()
    {
        $this->forceRedirect(true);
    }

    public function handle($except = null)
    {


        $thread_id = request()->route('thread');
        $message_id = request()->route('message');

        $message = Message::query()
            ->where('thread_id', '=', $thread_id)
            ->where('id', '=', $message_id)
            ->first();

        if($message === null) {
            abort(400, 'Unable to find message');
        }

        $page = $message->findPageInThread();

        $url = route('app.forum.thread', ['thread' => $message->thread_id]) . '?$page='.$page.'#thread-message-' . $message->id;

        return response()->redirectTo($url);
    }


}
