<?php

namespace App\Models\Course;

use App\Models\Achievements\Achievement;
use App\Support\Enums\ResourceProgress;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

/**
 * @property int id
 * @property int level
 * @property string title
 * @property mixed slug
 * @property string description
 * @property int category_id
 * @property int position
 */
class Course extends Model
{

    use HasTimestamps, Changeable, HasUserGeneratedContent;

    protected $table = 'courses';
    protected $userGeneratedContent = [
        'description',
    ];

    const PURIFIER_CONFIG = 'admin';

    protected static function boot()
    {
        parent::boot();

        static::saved(function (Course $course) {
            $course->siblings()->get('id')->each->clearCaches();
        });

        static::deleted(function (Course $course) {
            $course->clearCaches();
        });
    }


    //////////////////////////
    /// Relations
    //////////////////////////

    public function resources()
    {
        return $this->hasMany(CourseResource::class, 'course_id', 'id');
    }

    public function siblings()
    {
        return $this->hasMany(static::class, 'category_id', 'category_id');
    }

    public function category()
    {
        return $this->hasOne(CourseCategory::class, 'id', 'category_id');
    }

    public function achievement()
    {
        return $this->belongsTo(Achievement::class, 'achievement_id');
    }


    //////////////////////////
    /// Scopes
    //////////////////////////

    public function scopeCategorySlug(Builder $q, $slug)
    {
        return $q->whereHas('category', function (Builder $q) use ($slug) {
            $q->where('slug', $slug);
        });
    }

    public function scopeWithCategoryTitle(Builder $q)
    {
        return $q->addSelect(['category_title' => CourseCategory::select('title')
            ->whereColumn('id', 'courses.category_id')
            ->limit(1)
        ]);
    }

    public function scopeCompleted(Builder $q)
    {
        return $q->whereHas('progress', function (Builder $q) {
            $q->where('status', ResourceProgress::COMPLETED);
        });
    }


    //////////////////////////
    /// Attributes
    //////////////////////////

    public function getLinkAttribute()
    {
        return [
            'title'      => $this->title,
            'route'      => 'app.courses.course',
            'parameters' => [
                'category'    => optional($this->category)->slug,
                'course'      => $this->id,
                'course_slug' => $this->slug,
            ],
        ];
    }

    public function getPrevCourseAttribute()
    {
        return Cache::remember("{$this->id}_prev_course", 60 * 60 * 24 * 7, function () {
            return optional($this->getAdjacentCourse(false))->link;
        });
    }

    public function getNextCourseAttribute()
    {
        return Cache::remember("{$this->id}_next_course", 60 * 60 * 24 * 7, function () {
            return optional($this->getAdjacentCourse(true))->link;
        });
    }

    /**
     * Gets the adjacent course
     *
     * @param bool $next true = next, false = prev
     * @return Builder
     */
    public function getAdjacentCourse(bool $next)
    {
        $operator = $next ? '>' : '<';
        $dir      = $next ? 'asc' : 'desc';

        $sibling = $this->siblings()
            ->where('level', (int)$this->level)
            ->where('position', $operator, (int)$this->position)
            ->orderBy('position', $dir)
            ->first();

        return $sibling ?? $this->siblings()
                ->where('level', $operator, (int)$this->level)
                ->orderBy('level', $dir)
                ->orderBy('position', $dir)
                ->first();
    }

    public function clearCaches()
    {
        Cache::forget("{$this->id}_next_course");
        Cache::forget("{$this->id}_prev_course");
    }

    //////////////////////////
    /// Progress
    //////////////////////////

    public function progress()
    {
        return $this->hasOne(CourseProgress::class, 'course_id', 'id')
            ->where('user_id', Auth::id());
    }

    public function getIsCompletedAttribute()
    {
        return $this->progress
            ? ($this->progress->status === ResourceProgress::COMPLETED)
            : false;
    }

    //////////////////////////
    /// Misc
    //////////////////////////

    public static function getNewsletterHiglights($count = 3)
    {
        return static::query()
            ->orderBy('created_at', 'desc')
            ->with('category:id,slug,logo_id', 'category.logo')
            ->limit($count)
            ->get()
            ->map(static function (Course $course) {
                    return [
                        'title' => $course->title,
                        'alt'   => $course->title,
                        'img'   => optional($course->category)->logo_url,
                        'link'  => route('app.courses.course', [
                            'category'    => optional($course->category)->slug,
                            'course'      => $course->id,
                            'course_slug' => $course->slug,
                        ]),
                    ];
            });
    }
}
