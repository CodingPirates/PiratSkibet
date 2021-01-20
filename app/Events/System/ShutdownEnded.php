<?php

namespace App\Events\System;

use App\Support\Facades\Shutdown;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class ShutdownEnded implements ShouldBroadcast
{

    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $broadcastQueue	= 'system';
    public $connection	    = 'sync';

    public function broadcastOn()
    {
        return 'system.shutdown';
    }

    public function broadcastAs()
    {
        return 'ended';
    }

    public function broadcastWith()
    {
        return array_merge(
            Shutdown::getEnv(),
            [
                'is_active' => false
            ]
        );
    }

}