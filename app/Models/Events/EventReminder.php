<?php

namespace App\Models\Events;


use App\Jobs\Events\RemindEventUsers;
use App\Support\Traits\Changeable;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class EventReminder extends Model
{

    use Changeable;

    protected $table    = 'event_reminders';
    protected $dates    = ['remind_at'];
    protected $fillable = ['remind_at'];
    protected $casts    = ['reminded' => 'boolean'];

    //////////////////////////
    /// Relations
    //////////////////////////

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeReminded(Builder $q, bool $reminded = true)
    {
        return $q->where('reminded', $reminded);
    }

    public function scopeRemindAfter(Builder $q, Carbon $before)
    {
        return $q->where('remind_at', '>=', $before);
    }

    public function scopeRemindBefore(Builder $q, Carbon $before)
    {
        return $q->where('remind_at', '<=', $before);
    }

    //////////////////////////
    /// Helpers
    //////////////////////////

    public function scheduleReminder()
    {
        RemindEventUsers::dispatch($this, $this->event)->delay($this->remind_at);
    }

}
