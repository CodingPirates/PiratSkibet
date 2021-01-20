<?php

namespace App\Models\Moderation;

use App\Models\User\User;
use App\Support\Enums\ModerationActions;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ModerationAction extends Model
{
    use Changeable;

    protected $table = 'moderation_actions';
    protected $casts = [
        'meta' => 'json',
    ];

    protected static function boot()
    {
        parent::boot();

        static::created(function (ModerationAction $action) {
            $action->case->triggerUpdatedEvent();
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
     * Author of the ModerationAction
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function getLabelAttribute()
    {
        return ModerationActions::translate($this->action_class, [
            'moderateable' => $this->case->moderateable_label,
        ])['log'];
    }

    public function scopeForCase(Builder $q, $case = null)
    {
        if($case instanceof ModerationCase) {
            $case = $case->id;
        }

        return $q->where('moderation_case_id', $case);
    }

    public function scopeType(Builder $q, string $type)
    {
        return $q->where('type', $type);
    }

    public function scopeNewestFirst(Builder $q)
    {
        return $q->latest()->orderBy('id', 'desc');
    }

    public function scopeOldestFirst(Builder $q)
    {
        return $q->oldest()->orderBy('id', 'asc');
    }

}
