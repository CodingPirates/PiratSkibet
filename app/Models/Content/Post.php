<?php

namespace App\Models\Content;

use App\Support\Enums\GenericStatus;
use App\Support\Enums\PostType;
use App\Support\Traits\Changeable;
use App\Support\Traits\HasUserGeneratedContent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Post extends Model
{

    use HasUserGeneratedContent, Changeable;

    //////////////////////////////////
    /// Configuration
    //////////////////////////////////

    protected $dates = ['created_at', 'updated_at'];

    protected $hidden = [];

    protected $appends = [];

    protected $casts = [
        'version' => 'integer'
    ];

    const PURIFIER_CONFIG = 'admin';

    protected $userGeneratedContent = [
        'content',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function (Post $post) {

            $post->version = $post->version + 1;

            if(empty($post->type)) {
                $post->type = PostType::PAGE;
            }
        });

        static::saved(function (Post $post) {
            if($post->type !== PostType::REVISION) {
                $post->storeRevision();
            }
        });

    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeVisible($q)
    {
        if(Auth::check() === false || Auth::user()->can('api.backend.content.posts.store') === false) {
            $q->where('status', '=', GenericStatus::PUBLISHED);
        }

        $q->where('type', '=', PostType::PAGE);

        return $q;
    }

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

    public function storeRevision()
    {

        if(!$this->getOriginal('id')) {
            return;
        }

        $copy = $this->replicate();

        foreach ($this->original as $attribute => $value) {
            $copy->{$attribute} = $value;
        }

        $copy->parent_id = $copy->id;
        $copy->version = $copy->version - 1; ///FIX - TODO: This should not be needed?
        $copy->id = null;

        $copy->type = PostType::REVISION;
        $copy->save();
    }

    public function getOpenGraphMetaAttribute()
    {
        return array_filter([
            'title'       => $this->title,
            'description' => $this->description,
            'image'       => $this->image
        ]);
    }
}
