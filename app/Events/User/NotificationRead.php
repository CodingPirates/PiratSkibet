<?php

namespace App\Events\User;

use Illuminate\Notifications\DatabaseNotification;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NotificationRead implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private $user;

    /**
     * Create a new event instance.
     *
     * @param DatabaseNotification $notification
     */
    public function __construct(DatabaseNotification $notification)
    {
        $this->user = $notification->notifiable;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel("App.Models.User.User.{$this->user->id}");
    }

    public function broadcastAs()
    {
        return 'notification.read';
    }

}
