<?php

namespace App\Support\Traits\Notifications;


use Closure;
use App\Channels\RepeatableDatabaseChannel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Notifications\Notification;

trait Repeatable
{

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        if (!$notifiable->shouldNotify($this)) {
            return [];
        }

        return ['broadcast', RepeatableDatabaseChannel::class];
    }

    protected static function transKey(string $key)
    {
        return 'notifications.' . static::$type . ".{$key}";
    }

    /**
     * Used to specify identifier key => value pairs
     * Use arrow->syntax for nested JSON keys
     *
     * @param mixed $notifiable
     * @return array
     */
    private function getIdentifiers($notifiable) : array
    {
        return [];
    }

    /**
     * Queries for a previously existing notification of same type and with same identifiers
     *
     * @param mixed $notifiable
     * @param MorphMany $query
     * @return Notification|null
     */
    public function getPredecessor($notifiable, MorphMany $query)
    {
        $identifiers = $this->getIdentifiers($notifiable);

        if (empty($identifiers)) {
            return null;
        }

        return $query
            ->whereType(static::class)
            ->where(function ($query) use ($identifiers) {
                return $this->constrain($query, $identifiers);
            })
            ->first();
    }

    /**
     * Constrain $query by each identifier
     *
     * @param Builder $query
     * @param array $identifiers
     * @return Builder
     */
    public function constrain(Builder $query, array $identifiers)
    {
        foreach ($identifiers as $key => $value) {
            $query->where("data->{$key}", $value);
        }

        return $query;
    }

}
