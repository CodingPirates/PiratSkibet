<?php

namespace App\Models\Moderation;

use App\Support\Services\Moderation\Actions\Appeal as AppealAction;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Appeal extends Model
{

    use Changeable;

    protected $table = 'appeals';

    protected static function boot()
    {
        parent::boot();

        static::created(function (Appeal $appeal) {
            $appeal->case->performAsyncModeration(AppealAction::class, $appeal->message, $appeal);
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

    public function scopeForCase(Builder $q, $case = null)
    {
        if($case instanceof ModerationCase) {
            $case = $case->id;
        }

        return $q->where('moderation_case_id', $case);
    }

}
