<?php

namespace App\Events\Moderation\ModerationCase;

use App\Models\Moderation\ModerationCase;
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

    public $broadcastQueue	= 'moderation';
    public $connection	    = 'sync';

    protected $case;

    public function __construct(ModerationCase $case)
    {
        $this->case = $case;
    }

    public function broadcastOn()
    {
        return 'moderation.case.' . $this->case->id . '';
    }

    public function broadcastAs()
    {
        return 'updated';
    }

    public function broadcastWith()
    {
        return [
            'case_id' => $this->case->id
        ];
    }




}
