<?php

namespace App\Operations\Interactions;

use MorningTrain\Laravel\Resources\Support\Contracts\EloquentOperation;

class Reaction extends EloquentOperation
{

    const ROUTE_METHOD = 'post';

    protected $reaction_type = 'like';

    public function type($type = 'like') {
        $this->reaction_type = $type;

        return $this;
    }

    public function handle($reactable = null)
    {
        validator(request()->all(), [
            'react' => 'required|boolean',
        ])->validate();

        $reactable = parent::handle($reactable);

        if($reactable === null) {
            return abort(404);
        }

        $type = $this->reaction_type;
        $react = filter_var(request()->input('react'), FILTER_VALIDATE_BOOLEAN);

        return $reactable->triggerReaction($type, $react);
    }


}
