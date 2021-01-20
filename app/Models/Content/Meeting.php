<?php

namespace App\Models\Content;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $casts = [
        'banner_active'  => 'boolean',
        'meeting_active' => 'boolean',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function (Meeting $meeting) {
            if ($meeting->banner_active && $meeting->isDirty('banner_active')) {
                static::query()->update(['banner_active' => false]);
            }
        });
    }

    public function scopeActive(Builder $q, bool $active = true)
    {
        return $q->where('banner_active', $active);
    }

    public static function export()
    {
        $meeting = static::query()->active()->first();

        if (!$meeting) {
            return null;
        }

        return [
            'description'  => $meeting->description,
            'meeting_room' => $meeting->meeting_active ? $meeting->meeting_room : null,
            'time'         => $meeting->pretty_hours,
        ];
    }

    ////////////////////////
    /// Time formatting
    ////////////////////////

    public function getPrettyHoursAttribute()
    {
        return
            $this->pretty_from
            . ' - '
            . $this->pretty_to;
    }

    public function getPrettyFromAttribute()
    {
        return static::formatHour($this->from);
    }

    public function getPrettyToAttribute()
    {
        return static::formatHour($this->to);
    }

    private static function formatHour(string $hour)
    {
        return Carbon::parse($hour)->format('H:i');
    }
}
