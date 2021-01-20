<?php

namespace App\Events\Forum\Thread;

use App\Models\Forum\Message;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class MessageCreated implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $broadcastQueue = 'forum';
    public $connection = 'sync';

    public $message;
    public $thread;

    public function __construct(Message $message)
    {
        $this->message = $message;
        $this->thread = $message->thread;
    }

    public function broadcastOn()
    {
        return 'forum.thread.' . $this->thread->id . '';
    }

    public function broadcastAs()
    {
        return 'message.created';
    }

    public function broadcastWith()
    {
        return [
            'thread_id' => $this->thread->id,
            'message_id' => $this->message->id,
            'user_id' => $this->message->user_id,
        ];
    }

}
