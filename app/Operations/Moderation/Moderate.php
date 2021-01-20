<?php

namespace App\Operations\Moderation;

use App\Models\Moderation\ModerationCase;
use App\Support\Services\Moderation\ModerationActionException;
use Illuminate\Foundation\Validation\ValidatesRequests;
use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;
use MorningTrain\Laravel\Resources\Support\Pipes\Validates;

class Moderate extends EloquentOperation
{

    const ROUTE_METHOD = 'post';

    use ValidatesRequests;

    public function __construct()
    {
        $this->model(ModerationCase::class);
        $this->view(['with' => ['moderateable']]);
    }

    public function handle($case = null)
    {
        validator(request()->all(), [
            'action' => 'required|string|in:' . implode(',', $case->moderation_actions),
            'note'   => 'required|string',
            'meta'   => 'nullable|array',
        ])->validate();

        try {
            $result = $case->performModeration(
                request()->action,
                request()->note,
                request()->except(['action', 'note'])
            );
        }
        catch (ModerationActionException $e) {
            $this->setMessage($e->getMessage());
            $this->setStatusCode($e->getCode());

            return null;
        }

        $this->setMessage($result === false ? null : 'Success');
        $this->setStatusCode(200);

        return $result;
    }


}
