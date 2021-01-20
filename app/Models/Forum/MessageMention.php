<?php

namespace App\Models\Forum;

use App\Models\User\User;
use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class MessageMention extends Model
{

    use Changeable;

    protected $fillable = ['user_id'];

    protected $table = 'forum_message_mentions';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s P',
        'updated_at' => 'datetime:Y-m-d H:i:s P'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $appends = [
    ];

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function message()
    {
        return $this->belongsTo(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    public function scopeUser(Builder $builder, $user)
    {
        if($user instanceof User) {
            $user = $user->id;
        }

        return $builder->where('user_id', '=', $user);
    }


    //////////////////////////////////
    /// Attribute getters
    //////////////////////////////////

    //////////////////////////////////
    /// Attribute setters
    //////////////////////////////////

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

}
