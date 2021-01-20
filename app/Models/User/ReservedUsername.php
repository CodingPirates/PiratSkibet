<?php

namespace App\Models\User;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class ReservedUsername extends Model
{

    use Changeable;

    protected $fillable = [
        'username',
        'identifier',
    ];

    ///////////////////////////
    /// Static helpers
    ///////////////////////////

    /**
     * Creates or updates a ReservedUsername based on the identifier
     *
     * @param string $username
     * @param string $identifier
     */
    public static function reserveUsername(string $username, string $identifier): void
    {
        static::query()->updateOrCreate(
            ['identifier' => $identifier],
            ['username' => $username]
        );
    }

    /**
     * Deletes a ReservedUsername based on the identifier
     *
     * @param string|null $identifier
     */
    public static function removeReservation(string $identifier = null): void
    {
        static::query()->whereIdentifier($identifier)->delete();
    }

    public static function deleteExpired()
    {
        return static::expired()->delete();
    }

    ///////////////////////////
    /// Scopes
    ///////////////////////////

    public function scopeExpired(Builder $q)
    {
        return $q->where(
            'updated_at',
            '<',
            now()->subMinutes(config('session.lifetime'))
        );
    }
}
