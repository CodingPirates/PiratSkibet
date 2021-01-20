<?php

namespace App\Models\Moderation;

use App\Models\User\User;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class UserSuspension extends Model
{

    use Changeable;

    protected $table   = 'user_suspensions';
    protected $appends = [
        'duration',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    protected $dates = [
        'start_at',
        'end_at',
    ];

    protected $fillable = [
        'start_at',
        'end_at',
        'issued_by',
    ];

    //////////////////////////
    /// Relations
    //////////////////////////

    public function user()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class, 'user_id')
        );
    }

    public function issuer()
    {
        return User::userRelationFallbackWrap(
            $this->belongsTo(User::class, 'issued_by')->withDefault([
                'username' => __('misc.automatic'),
            ])
        );
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeActive(Builder $q)
    {
        $now = now();

        return $q
            ->where('active', true)
            ->where('start_at', '<=', $now)
            ->where(function (Builder $q) use ($now) {
                $q->whereNull('end_at')
                    ->orWhere('end_at', '>=', $now);
            });
    }

    public function scopeForUser(Builder $q, $user)
    {
        if ($user instanceof User) {
            $user = $user->id;
        }

        return $q->where('user_id', $user);
    }

    public function scopeOrderByUsername(Builder $q, $dir = 'asc')
    {
        $userQuery = User::select('username')
            ->whereColumn('id', 'user_suspensions.user_id')
            ->limit(1);

        // If withTrashed is not applied, it messes up the ordering
        User::currentUserCanModerate() ? $userQuery->withTrashed() : $userQuery;

        return $q->orderBy($userQuery, $dir);
    }

    public function scopeOrderByDuration(Builder $q, $dir = 'asc')
    {
        return $q->orderByRaw("TIMESTAMPDIFF(SECOND, start_at, end_at) {$dir}");
    }

    //////////////////////////
    /// Methods
    //////////////////////////

    public function deactivate() {
        $this->active = false;

        return $this->save();
    }

    //////////////////////////
    /// Attributes
    //////////////////////////

    /**
     * Returns number of seconds between start and end date
     *
     * @return int|string
     */
    public function getDurationAttribute()
    {
        return is_null($this->end_at) ?
            __('misc.indefinite') :
            $this->start_at->diffInSeconds($this->end_at);
    }

}
