<?php

namespace App\Support\Enums;


use MorningTrain\Laravel\Support\Enum;

class CommonPermissions extends Enum
{
    CONST MODERATE = 'api.backend.moderation.moderation_case.moderate';
    CONST ENDORSE_PROJECTS = 'api.projects.project.endorse';

}
