<?php

namespace App\Models\Forum;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;

class MessageChange extends Model
{

    use Changeable;

    protected $table = 'forum_message_changes';

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

    //////////////////////////////////
    /// Scopes
    //////////////////////////////////

    //////////////////////////////////
    /// Attribute getters
    //////////////////////////////////

    public function getContentAttribute($content)
    {
        $removed = __('misc.moderated');

        return $this->message->isModerated() ? "[{$removed}]" : $content;
    }

    //////////////////////////////////
    /// Attribute setters
    //////////////////////////////////

    //////////////////////////////////
    /// Helpers
    //////////////////////////////////

}
