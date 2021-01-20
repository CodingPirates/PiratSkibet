<?php

namespace App\Models\Moderation;

use App\Jobs\Moderation\AutomaticallyModerateCase;
use App\Models\User\User;
use App\Notifications\Moderation\NewModerationRequest;
use App\Support\Enums\ModerationReasons;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ModerationRequest extends Model
{
    use Changeable;

    protected $table = 'moderation_requests';
    protected $dates = [
        'resolved_at',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (ModerationRequest $request) {
            $request->sendNotification();
            $request->case->triggerUpdatedEvent();
            $request->scheduleAutomaticModeration();
        });
    }

    /**
     * The Moderation Case
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function case()
    {
        return $this->belongsTo(ModerationCase::class, 'moderation_case_id');
    }

    /**
     * Author of the ModerationRequest
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reporter()
    {
        return $this->belongsTo(User::class);
    }

    public function scopeForCase(Builder $q, $case = null)
    {
        if($case instanceof ModerationCase) {
            $case = $case->id;
        }

        return $q->where('moderation_case_id', $case);
    }

    public function scopeResolved(Builder $q, bool $resolved = true)
    {
        return $q->whereNull('resolved_at', 'and', $resolved);
    }

    public function scopeUnresolvedRemovalRequestForUserId(Builder $q, int $userId)
    {
        $q->where('reporter_id', $userId)
            ->where('reason', ModerationReasons::REMOVAL_REQUEST)
            ->resolved(false);
    }

    public function scopeOrderByUsername(Builder $q, $dir = 'asc')
    {
        $userQuery = User::select('username')
            ->whereColumn('id', 'moderation_requests.reporter_id')
            ->limit(1);

        // If withTrashed is not applied, it messes up the ordering
        User::currentUserCanModerate() ?
            $userQuery->withTrashed() :
            $userQuery;

        return $q->orderBy($userQuery, $dir);
    }


    public function sendNotification()
    {
        User::query()
            ->role('admin') // TODO moderators?
            ->get()
            ->each
            ->notify(new NewModerationRequest($this));
    }

    public function scheduleAutomaticModeration()
    {
        AutomaticallyModerateCase::dispatch($this->case);
    }

    public function getModerationWeightAttribute()
    {
        // Don't count toward total
        if ($this->reason === ModerationReasons::REMOVAL_REQUEST) {
            return 0;
        }

        return $this->reporter->moderation_weight;
    }
}
