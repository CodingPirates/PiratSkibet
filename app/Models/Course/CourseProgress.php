<?php

namespace App\Models\Course;

use App\Events\Course\CourseProgressCreated;
use App\Models\User\User;
use App\Support\Enums\ResourceProgress;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class CourseProgress extends Model
{
    use HasTimestamps, Changeable;

    protected $table = 'course_progress';

    protected $dispatchesEvents = [
        'created' => CourseProgressCreated::class,
    ];

    protected $casts = [
        'meta' => 'json'
    ];

    //////////////////////////
    /// Relationships
    //////////////////////////

    public function courseCategory()
    {
        return $this->belongsTo(CourseCategory::class, 'course_category_id', 'id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeMine(Builder $q)
    {
        return $q->where('user_id', '=', Auth::id());
    }

    //////////////////////////
    /// Helpers
    //////////////////////////

    public function getCompletedAttribute()
    {
        return $this->status === ResourceProgress::COMPLETED;
    }
}
