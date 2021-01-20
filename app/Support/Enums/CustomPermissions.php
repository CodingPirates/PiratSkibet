<?php

namespace App\Support\Enums;


use MorningTrain\Laravel\Support\Enum;

class CustomPermissions extends Enum
{
    CONST MANAGE_PROJECT_MEMBERS = 'manage_project_members';
    CONST UPGRADE_TO_PIRATE      = 'upgrade_to_pirate';

}
