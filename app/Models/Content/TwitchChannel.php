<?php

namespace App\Models\Content;

use App\Support\Traits\Changeable;
use Carbon\Carbon;
use Facades\App\Support\Services\Twitch;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;

class TwitchChannel extends Model
{
    use HasTimestamps, Changeable;

    protected $dates = ['created_at', 'updated_at', 'stream_checked_at', 'stream_started_at'];

    protected $hidden = [
    ];

    protected $appends = [
    ];

    protected $casts = [
        'is_live' => 'boolean'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function (TwitchChannel $channel) {
            if ($channel->isDirty(['channel_name'])) {
                if ($channel->hasTwitchClientId()) {
                    $channel->updateStatus(false);
                }
            }
        });

    }

    public static function getTwitchClientId()
    {
        return config('services.twitch.client_id');
    }

    public function hasTwitchClientId()
    {
        return !empty(static::getTwitchClientId());
    }

    protected function resetStatusAttributes()
    {
        $this->stream_title = '';
        $this->stream_started_at = null;
        $this->is_live = false;
    }

    public function updateStatus($save = true)
    {
        $stream = Twitch::getCurrentStreams($this->channel_name)->first();

        $this->resetStatusAttributes();

        if ($stream !== null) {
            $this->stream_title = $stream->title;
            $this->stream_started_at = Carbon::createFromFormat('Y-m-d\TH:i:s\Z', $stream->started_at);
            $this->is_live = $stream->type === 'live';
        }

        $this->stream_checked_at = Carbon::now();

        if($save === true) {
            $this->save();
        }

    }

}
