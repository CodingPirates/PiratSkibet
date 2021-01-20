<?php

namespace App\Models\User;

use App\Support\Traits\Changeable;
use App\Support\Traits\Meta\MetaModel;
use Illuminate\Database\Eloquent\Model;

class UserMeta extends Model
{
    use MetaModel;
    use Changeable;

    protected $table = 'user_meta';

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
