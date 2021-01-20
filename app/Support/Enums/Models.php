<?php

namespace App\Support\Enums;


use App\Models\Forum\Message;
use App\Models\Forum\Thread;
use App\Models\Projects\Project;
use App\Models\User\User;

class Models extends ExportableEnum
{
    public static $export = true;

    CONST USER    = User::class;
    CONST MESSAGE = Message::class;
    CONST THREAD  = Thread::class;
    CONST PROJECT = Project::class;
}
