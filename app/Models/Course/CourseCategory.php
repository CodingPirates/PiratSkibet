<?php

namespace App\Models\Course;

use App\Models\ResourceLink;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use MorningTrain\Laravel\Fields\Files\Models\File;

class CourseCategory extends Model
{

    use HasTimestamps, Changeable, HasUserGeneratedContent;

    protected $table = 'course_categories';
    protected $userGeneratedContent = [
        'description',
    ];

    const PURIFIER_CONFIG = 'admin';

    protected static function boot()
    {
        parent::boot();

        static::deleted(function (CourseCategory $category) {
            $category->removeFiles();
        });
    }

    protected $casts = [
        'active' => 'boolean'
    ];

    //////////////////////////////////
    /// Relations
    //////////////////////////////////

    public function courses(){
        return $this->hasMany(Course::class, 'category_id', 'id');
    }

    public function logo()
    {
        return $this->belongsTo(File::class);
    }

    public function thumbnail()
    {
        return $this->belongsTo(File::class);
    }

    public function resourceLinks(): HasMany
    {
        return $this->hasMany(ResourceLink::class)->orderBy('position');
    }


    //////////////////////////////////
    /// Attributes
    //////////////////////////////////

    public function getLogoUrlAttribute()
    {
        return optional($this->logo)->url;
    }

    public function getThumbnailUrlAttribute()
    {
        return optional($this->thumbnail)->url;
    }


    //////////////////////////
    /// Misc
    //////////////////////////

    private function removeFiles()
    {
        // Eager loaded, to trigger "delete" event
        // Which removes the actual files
        $this->logo->delete();
        $this->thumbnail->delete();
    }

    //////////////////////////
    /// Progress
    //////////////////////////

    public function completedCourses()
    {
        return $this->courses()->completed();
    }

}
