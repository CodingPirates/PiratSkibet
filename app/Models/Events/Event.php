<?php

namespace App\Models\Events;

use App\Models\Regions\Region;
use App\Models\User\User;
use App\Support\Enums\EventStatus;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Support\Collection;

class Event extends Model
{

    use HasUserGeneratedContent;
    use HasTimestamps;
    use Changeable;

    protected $appends = [];
    protected $table = 'events';
    protected $dates = [
        'publish_at',
        'start_at',
        'end_at',
    ];

    const PURIFIER_CONFIG = 'admin';

    protected $userGeneratedContent = [
        'description',
    ];

    //////////////////////////
    /// Regions, Zipcodes & Users
    //////////////////////////

    public function regions()
    {
        return $this->belongsToMany(Region::class);
    }

    public function getRelevantUsersQuery()
    {
        $regions = $this->regions()->pluck('region_id')->all();

        return User::query()->forRegions($regions);
    }

    /**
     * @return Collection
     */
    public function getRelevantUsersAttribute()
    {
        return $this->getRelevantUsersQuery()->get();
    }

    public function scopeForZipcode(Builder $q, $zipcode)
    {
        return $q->whereHas('regions.zipcodes', function ($q) use ($zipcode) {
            return $q->where('zipcode_zipcode', $zipcode);
        });
    }


    //////////////////////////
    /// Reminders
    //////////////////////////

    public function reminders()
    {
        return $this->hasMany(EventReminder::class);
    }

    public function setupDefaultReminders()
    {
        $fortnight = $this->start_at->copy()->subDays(14)->setTime(18, 30);
        $month     = $this->start_at->copy()->subMonths(1)->setTime(18, 30);

        $this->reminders()->createMany([
            ['remind_at' => $fortnight],
            ['remind_at' => $month],
        ]);
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeStatus(Builder $q, $status)
    {
        return $q->where('status', $status);
    }

    public function scopePublished(Builder $q)
    {
        return $q->where('publish_at', '<', Carbon::now())
            ->status(EventStatus::PUBLISHED);
    }

    public function scopeExpired(Builder $q, bool $bool = true)
    {
        $operator = $bool ?
            '<' : '>=';

        return $q->where('end_at', $operator, now());
    }

    //////////////////////////
    /// Attributes
    //////////////////////////

    public function getPrettyStartAttribute()
    {
        $format = 'D. MMM [kl.] LT';

        return $this->start_at->calendar(null, [
            'nextWeek' => $format,
            'sameElse' => $format,
        ]);
    }

}
