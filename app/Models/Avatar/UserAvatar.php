<?php

namespace App\Models\Avatar;

use App\Models\User\User;
use App\Support\Enums\AvatarCategory;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class UserAvatar extends Model
{

    use Changeable;

    protected $appends  = [
        'items',
        'svg',
    ];

    protected static function boot()
    {
        parent::boot();

        static::deleted(function (UserAvatar $avatar) {
            Cache::forget(static::getSvgCacheKey($avatar->id));
        });
    }

    public function user()
    {
        return $this->hasOne(User::class);
    }

    public function userAvatarItems()
    {
        return $this->hasMany(UserAvatarItem::class);
    }

    public function avatarItems()
    {
        return $this->hasManyThrough(
            AvatarItem::class,
            UserAvatarItem::class,
            'user_avatar_id',
            'id',
            'id',
            'avatar_item_id'
        );
    }

    public function scopeForUser(Builder $q, User $user)
    {
        $user_id = $user->id;

        return $q->whereHas('user', function (Builder $q) use ($user_id) {
            return $q->where('id', $user_id);
        });
    }

    public static function getSvgCacheKey(int $id)
    {
        return 'user_avatar_' . $id;
    }

    public function getSvgAttribute()
    {
        return static::getCachedAvatarSvg(static::getSvgCacheKey($this->id), function () {
            return $this->userAvatarItems()
                ->with('avatarItem')
                ->get()
                ->pluck('avatarItem.content', 'category');
        });
    }

    public static function getSvgById($id)
    {
        if($id === null) {
            return null;
        }
        return static::getCachedAvatarSvg(static::getSvgCacheKey($id), function () use($id) {
            return UserAvatar::find($id)->userAvatarItems()
                ->with('avatarItem')
                ->get()
                ->pluck('avatarItem.content', 'category');
        });
    }

    public static function removedAvatarSvg()
    {
        return static::getCachedAvatarSvg('user_avatar_removed', function () {
            return [
                'body'        => '<g><rect x="0" y="0" rx="5" ry="5" width="50" height="50" style="fill: #acaeaf;"></rect></g>',
                'hat'         => '<g transform="translate(-31.33 -40)"><path style="fill: #2f2f2f;" d="M9,8.49c0-.06,0-.12,0-.18a.65.65,0,0,0-.05-.2.19.19,0,0,0,0-.08l-.06-.09a.88.88,0,0,0-.12-.17.64.64,0,0,0-.15-.13.29.29,0,0,0-.08-.07l-5-3a1,1,0,1,0-1,1.71l3.32,2L.61,10.5a1,1,0,0,0-.53,1.32,1,1,0,0,0,.92.6.88.88,0,0,0,.39-.08l7-3,0,0a1.12,1.12,0,0,0,.29-.19.1.1,0,0,1,0-.05c0-.05.08-.09.11-.14s0,0,0-.08A1.07,1.07,0,0,0,9,8.67,1.16,1.16,0,0,0,9,8.49Z"></path><path style="fill: #131313;" d="M56.34,13V4.85A4.85,4.85,0,0,0,51.49,0H11.18A4.85,4.85,0,0,0,6.34,4.85V13Z"></path><path style="fill: #2f2f2f;" d="M6.34,13l50-7v7h-50"></path><path style="fill: #2f2f2f;" d="M6.34,13l34-13H51.47L6.34,13"></path></g>',
                'eyes'        => '<g transform="translate(-14.97, -5)"><circle style="fill: #b5b5b5;" cx="5.5" cy="5.5" r="4.58"></circle><circle style="fill: #b5b5b5;" cx="24.44" cy="5.5" r="4.58"></circle><path style="fill: #a5a5a5;" d="M5.56.92v9.16a4.58,4.58,0,0,0,0-9.16Z"></path><path style="fill: #a5a5a5;" d="M24.51.92v9.16a4.58,4.58,0,0,0,0-9.16Z"></path><circle style="fill: #fff;" cx="5.5" cy="5.5" r="3.21"></circle><circle style="fill: #fff;" cx="24.44" cy="5.5" r="3.21"></circle><circle style="fill: #fff; opacity: 0.15;" cx="24.44" cy="5.5" r="3.67"></circle><circle style="fill: #fff; opacity: 0.15;" cx="24.44" cy="5.5" r="4.13"></circle><circle style="fill: #fff; opacity: 0.15;" cx="24.44" cy="5.5" r="4.58"></circle><circle style="fill: #fff; opacity: 0.15;" cx="24.44" cy="5.5" r="5.04"></circle><circle style="fill: #fff; opacity: 0.15;" cx="24.44" cy="5.5" r="6"></circle><circle style="fill: #fff; opacity: 0.15;" cx="5.5" cy="5.5" r="3.67"></circle><circle style="fill: #fff; opacity: 0.15;" cx="5.5" cy="5.5" r="4.13"></circle><circle style="fill: #fff; opacity: 0.15;" cx="5.5" cy="5.5" r="4.58"></circle><circle style="fill: #fff; opacity: 0.15;" cx="5.5" cy="5.5" r="5.04"></circle><circle style="fill: #fff; opacity: 0.15;" cx="5.5" cy="5.5" r="6"></circle></g>',
                'mouth'       => '<g transform="translate(5 0)"><path d="m 0 0 h -10" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path></g>',
                'legs'        => '<path d="m -3 0 v 20 h -4" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path><path d="m 3 0 v 20 h 4" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path>',
                'arms'        => '<g transform="translate(-33 0)"><path class="cls-1" d="M66.44,15.19,63.8,12C61.35,3.16,57.73.29,57.58.17a.75.75,0,0,0-.92,1.19s3.38,2.73,5.67,11l-1.57,4.35a.74.74,0,0,0,.71,1,.74.74,0,0,0,.7-.49l.62-1.71.26,1.93a.74.74,0,0,0,.74.65h.11a.76.76,0,0,0,.64-.85l-.32-2.33,1.06,1.28a.74.74,0,0,0,1,.1A.75.75,0,0,0,66.44,15.19Z"/><path class="cls-1" d="M10.08.29A.74.74,0,0,0,9,.16C8.88.27,5.26,3.15,2.81,12L.17,15.17a.75.75,0,1,0,1.16,1l1-1.19L2,17.13a.75.75,0,0,0,.62.86h.12a.75.75,0,0,0,.74-.63l.32-2,.72,2.1a.76.76,0,0,0,.71.51.73.73,0,0,0,.25,0A.74.74,0,0,0,5.89,17L4.27,12.3C6.56,4.11,9.88,1.39,10,1.34A.76.76,0,0,0,10.08.29Z"/></g>',
                'accessories' => '<g></g>',
            ];
        });
    }

    CONST FALLBACK = [
        'body'        => '<g><rect x="0" y="0" rx="5" ry="5" width="50" height="50" style="fill: #FFF100;"></rect></g>',
        'hat'         => '<g transform="translate(-31.33 -40)"><path style="fill: #2f2f2f;" d="M9,8.49c0-.06,0-.12,0-.18a.65.65,0,0,0-.05-.2.19.19,0,0,0,0-.08l-.06-.09a.88.88,0,0,0-.12-.17.64.64,0,0,0-.15-.13.29.29,0,0,0-.08-.07l-5-3a1,1,0,1,0-1,1.71l3.32,2L.61,10.5a1,1,0,0,0-.53,1.32,1,1,0,0,0,.92.6.88.88,0,0,0,.39-.08l7-3,0,0a1.12,1.12,0,0,0,.29-.19.1.1,0,0,1,0-.05c0-.05.08-.09.11-.14s0,0,0-.08A1.07,1.07,0,0,0,9,8.67,1.16,1.16,0,0,0,9,8.49Z"></path><path style="fill: #131313;" d="M56.34,13V4.85A4.85,4.85,0,0,0,51.49,0H11.18A4.85,4.85,0,0,0,6.34,4.85V13Z"></path><path style="fill: #2f2f2f;" d="M6.34,13l50-7v7h-50"></path><path style="fill: #2f2f2f;" d="M6.34,13l34-13H51.47L6.34,13"></path></g>',
        'eyes'        => '<g><circle r="1" cx="-5" cy="0"></circle><circle r="1" cx="5" cy="0"></circle></g>',
        'mouth'       => '<g transform="translate(5 0)"><path d="m 0 0 q -5 5 -10 0" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path></g>',
        'legs'        => '<path d="m -3 0 v 20 h -4" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path><path d="m 3 0 v 20 h 4" style="stroke: #2f2f2f;stroke-width: 1.5;stroke-linecap: round;fill: none;"></path>',
        'arms'        => '<g transform="translate(-33 0)"><path class="cls-1" d="M66.44,15.19,63.8,12C61.35,3.16,57.73.29,57.58.17a.75.75,0,0,0-.92,1.19s3.38,2.73,5.67,11l-1.57,4.35a.74.74,0,0,0,.71,1,.74.74,0,0,0,.7-.49l.62-1.71.26,1.93a.74.74,0,0,0,.74.65h.11a.76.76,0,0,0,.64-.85l-.32-2.33,1.06,1.28a.74.74,0,0,0,1,.1A.75.75,0,0,0,66.44,15.19Z"/><path class="cls-1" d="M10.08.29A.74.74,0,0,0,9,.16C8.88.27,5.26,3.15,2.81,12L.17,15.17a.75.75,0,1,0,1.16,1l1-1.19L2,17.13a.75.75,0,0,0,.62.86h.12a.75.75,0,0,0,.74-.63l.32-2,.72,2.1a.76.76,0,0,0,.71.51.73.73,0,0,0,.25,0A.74.74,0,0,0,5.89,17L4.27,12.3C6.56,4.11,9.88,1.39,10,1.34A.76.76,0,0,0,10.08.29Z"/></g>',
        'accessories' => '<g></g>',
    ];

    public static function getCachedAvatarSvg(string $key, \Closure $rows)
    {
        return Cache::rememberForever($key, function () use ($rows) {
            return view('layouts.avatar')
                ->with(['rows' => collect(static::FALLBACK)->merge($rows())])
                ->render();
        });
    }

    public static function setup(User $user)
    {
        $avatar = static::query()->forUser($user)->firstOrCreate([]);

        $items = AvatarItem::getDefaultItems();

        foreach (AvatarCategory::values() as $category) {
            $item_id = $items->get($category)->id;

            UserAvatarItem::firstOrCreate(
                ['user_avatar_id' => $avatar->id, 'category' => $category],
                ['avatar_item_id' => $item_id]
            );
        }

        return $avatar;
    }

    public function setItems(array $items)
    {
        foreach (AvatarCategory::values() as $category) {
            $id = $items[$category] ?? null;

            if ($id === null) {
                continue;
            }

            $this->setItem($category, $id);
        }
    }

    public function setItem(string $category, int $value)
    {
        if (!AvatarCategory::validate($category)) {
            throw new \Exception('Invalid AvatarCategory provided.');
        }

        $item = AvatarItem::category($category)->where('id', $value)->firstOrFail();

        UserAvatarItem::updateOrCreate(
            ['user_avatar_id' => $this->id, 'category' => $category],
            ['avatar_item_id' => $item->id]
        );
    }

    /////////////////////////////
    /// Item getters
    /////////////////////////////

    public function getItemsAttribute()
    {
        return $this->avatarItems()->get()->keyBy('category');
    }
}
