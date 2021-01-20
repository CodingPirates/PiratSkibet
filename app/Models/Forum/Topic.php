<?php

namespace App\Models\Forum;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{

    use Changeable;

    public $timestamps = false;

    protected $table = 'forum_topics';

    protected $casts = [
    ];

    protected $appends = [
    ];

    protected static function boot()
    {
        parent::boot();

        static::saved(function (Topic $topic) {

            if ($topic->isDirty('parent_id') || $topic->wasRecentlyCreated) {

                $iterator = $topic;

                $ids = [$topic->id];

                do {
                    if ($iterator->parent !== null) {
                        $iterator = $iterator->parent;

                        $ids[] = $iterator->id;

                    }
                } while ($iterator->parent !== null);

                $topic->ancestors()->sync($ids);

            }

        });

    }

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function descendantThreads()
    {
        return $this->hasManyThrough(Thread::class, TopicAncestry::class, 'ancestor_id', 'topic_id', 'id', 'topic_id');
    }

    public function threads()
    {
        return $this->hasMany(Thread::class, 'topic_id');
    }

    public function parent()
    {
        return $this->belongsTo(Topic::class, 'parent_id');
    }

    public function ancestors()
    {
        return $this->belongsToMany(Topic::class, (new TopicAncestry())->getTable(), 'topic_id', 'ancestor_id');
    }

    public function children()
    {
        return $this->hasMany(Topic::class, 'parent_id');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeWithParentName(Builder $q) {
        return $q
            ->leftJoin('forum_topics as parent', 'parent.id', '=', 'forum_topics.parent_id')
            ->select(['forum_topics.*', 'parent.name as parent_name']);
    }

    //////////////////////////////////
    /// Attribute getters
    //////////////////////////////////

    public function getLatestMessageAttribute()
    {
        return Message::query()
            ->orderBy('updated_at', 'DESC')
            ->whereHas('thread.ancestralTopics', function ($q) {
                $q->where($this->getTable() . '.id', '=', $this->id);
            })
            ->first();
    }

    //////////////////////////////////
    /// Attribute setters
    //////////////////////////////////

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

}
