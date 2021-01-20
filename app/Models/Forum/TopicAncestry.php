<?php

namespace App\Models\Forum;

use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;

class TopicAncestry extends Model
{

    use Changeable;

    public $timestamps = false;

    protected $table = 'forum_topic_ancestry';

}
