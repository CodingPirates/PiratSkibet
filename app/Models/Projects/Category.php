<?php

namespace App\Models\Projects;


use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{

    use Changeable;

    protected $table = 'project_categories';

    //////////////////////////////////
    /// Hierarchy
    //////////////////////////////////

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function projects()
    {
        return $this->belongsToMany(Project::class, 'project_project_categories');
    }

    public function scopeParent(Builder $q, bool $parent = true)
    {
        return $q->whereNull('parent_id', 'and', !$parent);
    }

    public function scopePublic(Builder $q)
    {
        return $q->where(function (Builder $q) {
                $q->parent(false); // Only children...
            })
            ->orWhere(function (Builder $q) {
                $q->has('children'); // ...or parents with children
            });
    }

    public function getDisplayNameAttribute()
    {
        return join(' : ', array_filter([optional($this->parent)->name, $this->name]));
    }

}
