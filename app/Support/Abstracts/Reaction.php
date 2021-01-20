<?php

namespace App\Support\Abstracts;


use App\Models\User\User;
use App\Support\Enums\ReactionType;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

abstract class Reaction extends Model
{

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeUser(Builder $builder, $user = null)
    {
        if ($user instanceof User) {
            $user = $user->id;
        }

        if ($user !== null) {
            return $builder->where('user_id', '=', $user);
        }

        return $builder->whereNull('user_id');
    }

    public function scopeMine(Builder $builder)
    {
        return $builder->user(Auth::user());
    }

    public function scopeType(Builder $builder, $type)
    {
        return $builder->where('type', '=', $type);
    }

    public function scopeEndorsement(Builder $q, bool $endorsement = true)
    {
        return $q->where(
            'type',
            $endorsement ? '=' : '<>',
            ReactionType::ENDORSEMENT
        );
    }

}
