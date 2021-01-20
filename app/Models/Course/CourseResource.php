<?php

namespace App\Models\Course;

use App\Support\Enums\CourseResourceVideoTypes;
use App\Support\Enums\ResourceTypes;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use App\Support\Traits\Meta\MetaModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasTimestamps;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class CourseResource extends Model
{

    use MetaModel;
    use HasTimestamps;
    use Changeable;
    use HasUserGeneratedContent;

    const PURIFIER_CONFIG = 'admin';

    protected $table = 'course_resources';

    protected $casts = [
        'meta' => 'json'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function progress()
    {
        return $this->hasOne(CourseProgress::class, 'course_resource_id', 'id');
    }

    public function my_progress()
    {
        return $this->progress()->mine();
    }

    public function scopeWhereType(Builder $q, $type)
    {
        return $q->where('type', $type);
    }

    public function scopeWhereCourseSlug(Builder $q, $slug)
    {
        return $q->whereHas('course', function (Builder $q) use ($slug) {
            $q->where('slug', $slug);
        });
    }

    public function setMetaAttribute($meta)
    {
        $key = 'meta';

        // TODO - Temp. code - update when we get new video types
        // Sets default video type
        if (is_array($meta) && $this->type === ResourceTypes::VIDEO) {
            $meta['type'] = CourseResourceVideoTypes::DEFAULT;
        }

        foreach ($meta as $attribute => $value) {
            // Clean all content containing HTML
            if ($value !== strip_tags($value)) {
                $meta[$attribute] = $this->cleanUserContent($value);
            }
        }

        return $this->attributes['meta'] = $this->castAttributeAsJson($key, $meta);
    }

    //////////////////////////
    /// Helpers
    //////////////////////////

    public function checkAnswer(string $question, string $answer): bool
    {
        if ($this->type !== ResourceTypes::QUESTIONNAIRE) return false;

        $question = collect(optional($this->meta)['questions'])
            ->firstWhere('uuid', $question);

        if (empty($question) || !isset($question['answers'])) return false;

        $answer = collect($question['answers'])->firstWhere('uuid', $answer);

        return !empty($answer)
            && isset($answer['is_correct'])
            && $answer['is_correct'];
    }
}
