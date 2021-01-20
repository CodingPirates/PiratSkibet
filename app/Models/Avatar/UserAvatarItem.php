<?php

namespace App\Models\Avatar;

use App\Models\Avatar\AvatarItem;
use App\Support\Enums\AvatarCategory;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class UserAvatarItem extends Model
{

    use Changeable;

    protected $fillable = [
        'user_avatar_id',
        'avatar_item_id',
        'category',
    ];

    protected static function boot()
    {
        parent::boot();

        static::saved(function (UserAvatarItem $item) {
            Cache::forget(UserAvatar::getSvgCacheKey($item->user_avatar_id));
        });
    }

    public function avatarItem()
    {
        return $this->belongsTo(AvatarItem::class, 'avatar_item_id');
    }

    public function scopeCategory(Builder $q, string $category)
    {
        if (!AvatarCategory::validate($category)) {
            throw new \Exception('Invalid AvatarCategory provided.');
        }

        return $q->where('category', $category);
    }
}
