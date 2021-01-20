<?php

namespace App\Models\Avatar;

use App\Models\User\User;
use App\Support\Enums\AvatarCategory;
use App\Support\Enums\GenericStatus;
use App\Support\Traits\Changeable;
use App\Support\Traits\Rewardable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class AvatarItem extends Model
{
    use Rewardable, Changeable;

    protected $casts = [
        'is_public'  => 'boolean',
        'is_default' => 'boolean',
        'is_featured' => 'boolean',
        'meta'       => 'json',
    ];

    protected $appends = [
        'svg_viewbox',
        'svg_translate',
    ];

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeCategory(Builder $q, $category)
    {
        if (!is_string($category) || !AvatarCategory::validate($category)) {
            return $q;
        }

        return $q->where('category', $category);
    }

    public function scopePublished(Builder $q, bool $bool = true)
    {
        $status = $bool ?
            GenericStatus::PUBLISHED :
            GenericStatus::DRAFT;

        return $q->where('status', $status);
    }

    public function scopePublic(Builder $q, bool $bool = true)
    {
        return $q->where('is_public', $bool);
    }

    public function scopeDefault(Builder $q, bool $bool = true)
    {
        return $q->where('is_default', $bool);
    }

    public function scopeForUser(Builder $q, $user = null)
    {
        if ($user instanceof User) {
            $user = $user->id;
        }
        else if ($user === null && Auth::check()) {
            $user = Auth::id();
        }

        if (is_numeric($user)) {
            return $q
                ->public()
                ->orWhereHas('userRewards', function (Builder $q) use ($user) {
                    $q->where('user_id', (int)$user);
                });
        }

        return $q->public();
    }

    public function scopeOrderByFeatured(Builder $q)
    {
        return $q->orderBy('is_featured', 'DESC');
    }

    public function scopeOrderFirst(Builder $q, array $ids)
    {
        if (empty($ids)) {
            return $q;
        }

        $bindings = join(',', array_fill(0, count($ids), '?'));

        return $q->orderByRaw("FIELD(id, {$bindings}) DESC", $ids);
    }

    //////////////////////////////////
    /// Methods
    //////////////////////////////////

    public function userHasItem(User $user = null): bool
    {
        if ($this->is_public) return true;

        $user = $user ?? Auth::user();

        if ($user === null) return false;

        return $user->rewardItems()
            ->where('item_type', self::class)
            ->where('item_id', $this->id)
            ->exists();
    }

    //////////////////////////////////
    /// SVG helpers
    //////////////////////////////////

    public function getSvgViewboxAttribute()
    {
        return $this->buildSvgAttribute('viewBox', [
            'min-x'  => 0,
            'min-y'  => 0,
            'width'  => 0,
            'height' => 0,
        ]);
    }

    public function getSvgTranslateAttribute()
    {
        return $this->buildSvgAttribute('translate', [
            'x'  => 0,
            'y'  => 0,
        ]);
    }

    protected function buildSvgAttribute(string $meta_key, array $defaults)
    {
        $data = data_get($this->meta, $meta_key, []);

        $values = Arr::only(array_merge($defaults, $data), array_keys($defaults));

        return implode(' ', $values);
    }

    public function getSvgAttribute()
    {
        return Cache::rememberForever('avatar_item_' . $this->id, function () {
            return view('layouts.avatar_item')
                ->with([
                    'content'   => $this->content,
                    'viewBox'   => $this->svg_viewbox,
                    'translate' => $this->svg_translate,
                ])
                ->render();
        });
    }

    /**
     * @return Collection
     */
    public static function getDefaultItems()
    {
        return static::query()
            ->inRandomOrder()
            ->public()
            ->default()
            ->published()
            ->get()
            ->keyBy('category');
    }
}
