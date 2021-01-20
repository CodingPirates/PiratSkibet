<?php

namespace App\Support\Services\Moderation\Actions;


use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Abstracts\Action;
use App\Support\Services\Moderation\ModerationActionException;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class SuspendUser extends Action
{
    CONST TYPE = ModerationActionType::RESOLUTION;

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return mixed
     */
    protected function perform(...$args)
    {
        if (isset($args[0]) && is_array($args[0])) {
            $args = array_values($args[0]);
        }

        $from = static::getCarbon($args[0]);
        $to   = static::getCarbon($args[1]);

        $this->meta = [
            'from' => $from,
            'to'   => $to,
        ];

        $this->case->user->suspend($from, $to, Auth::user());
    }

    /**
     * @param $date
     * @return Carbon
     */
    public static function getCarbon($date)
    {
        if (is_null($date) || $date instanceof Carbon) return $date;

        try {
            $date = Carbon::parse($date);

        } catch (Exception $e) {
            static::throwMessage('Invalid date formats provided for User suspension.');
        }

        return $date;
    }

    public static function throwMessage(string $message)
    {
        throw new ModerationActionException($message, 400);
    }

}
