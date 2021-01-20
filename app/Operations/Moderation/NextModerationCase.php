<?php

namespace App\Operations\Moderation;

use App\Models\Moderation\ModerationCase;
use MorningTrain\Laravel\Resources\Support\Contracts\PageOperation;

class NextModerationCase extends PageOperation
{

    const ROUTE_METHOD = 'get';

    public function handle($except = null)
    {

        $except = request()->route('except');

        $q = ModerationCase::query();

        if($except !== null) {
            $q->exclude([$except]);
        }

        $q->unresolved();

        $case = $q->first();

        if($case === null) {
            return redirect()->back();
        }

        return redirect()->route('backend.moderation.view_case', ['moderation_case' => $case->id]);
    }


}
