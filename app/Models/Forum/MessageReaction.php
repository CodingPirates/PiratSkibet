<?php

namespace App\Models\Forum;

use App\Support\Abstracts\Reaction;
use App\Support\Traits\Changeable;

class MessageReaction extends Reaction
{

    use Changeable;

    protected $table = 'forum_message_reactions';

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s P',
        'updated_at' => 'datetime:Y-m-d H:i:s P'
    ];

    protected $dates = [
        'created_at',
        'updated_at'
    ];

    protected $fillable = [
        'user_id',
        'message_id',
        'type',
    ];

    protected $appends = [
    ];

    //////////////////////////////////
    /// Relationships
    //////////////////////////////////

    public function message()
    {
        return $this->belongsTo(Message::class, 'message_id');
    }

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

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
