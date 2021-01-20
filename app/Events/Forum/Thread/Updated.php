<?php

namespace App\Events\Forum\Thread;

use App\Models\Forum\Thread;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Support\Facades\Auth;

class Updated implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $broadcastQueue	= 'forum';
    public $connection	    = 'sync';

    protected $thread;

    public function __construct(Thread $thread)
    {
        $this->thread = $thread;
    }

    public function broadcastOn()
    {
        return 'forum.thread.' . $this->thread->id . '';
    }

    public function broadcastAs()
    {
        return 'updated';
    }

    public function broadcastWith()
    {
        return [
            'thread_id' => $this->thread->id
        ];
    }




}