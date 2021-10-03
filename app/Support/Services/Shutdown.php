<?php

namespace App\Support\Services;

use App\Events\System\ShutdownEnded;
use App\Events\System\ShutdownStarted;
use App\Models\User\User;
use Carbon\Carbon;

class Shutdown
{

    /////////////////////////////
    /// Access (state) helpers
    /////////////////////////////

    public function isWithinShutdownPeriod()
    {
        /// If ends at is before starts at, then it should be safe to assume
        /// that the shutdown period is currently active

        $now = Carbon::now();

        return $this->getStartsAt() <= $now && $now <= $this->getEndsAt();
    }

    public function isDeniedAccess(User $user, $permission_to_check)
    {
        $roles = config('auth.shutdown.roles', []);
        $permissions = config('auth.shutdown.permissions', []);

        if ($user->hasAnyRole($roles)) {
            if (!empty($permissions)) {

                if (in_array($permission_to_check, $permissions)) {
                    return true;
                }

                foreach ($permissions as $permission) {
                    if (preg_match('/' . $permission . '/', $permission_to_check)) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /////////////////////////////
    /// Start and end helpers
    /////////////////////////////

    public function getStartsAt()
    {
        return $this->getStartOfToday()->setSeconds($this->getFromInSeconds());
    }

    public function getEndsAt()
    {

        if($this->getFromInSeconds() > $this->getToInSeconds()) {
            return $this->getStartsAt()->copy()->addDay()->startOfDay()->setSeconds($this->getToInSeconds());
        }

        return $this->getStartsAt()->copy()->startOfDay()->setSeconds($this->getToInSeconds());
    }

    /////////////////////////////
    /// Config helpers
    /////////////////////////////

    public function getFromInSeconds()
    {
        /// Default -> 21:30
        return config('auth.shutdown.from', 1380) * 60;
    }

    public function getToInSeconds()
    {
        // Default -> 6:30
        return config('auth.shutdown.to', 390) * 60;
    }

    /////////////////////////////
    /// Carbon helpers
    /////////////////////////////

    public function getStartOfToday()
    {
        return Carbon::now()
            ->setTimezone('Europe/Copenhagen')
            ->startOfDay();
    }

    public function getStartOfTomorrow()
    {
        return $this->getStartOfToday()->copy()->addDay();
    }

    public function getCurrentSecondInDay()
    {
        return Carbon::now()
            ->setTimezone('Europe/Copenhagen')
            ->diffInSeconds(
                Carbon::now()
                    ->setTimezone('Europe/Copenhagen')
                    ->startOfDay()
            );
    }

    /////////////////////////////
    /// ENV Helpers
    /////////////////////////////

    public function getEnv()
    {
        return [
            'is_active' => $this->isWithinShutdownPeriod(),
            'starts_at' => $this->getStartsAt()->format('Y-m-d H:i:s'),
            'ends_at' => $this->getEndsAt()->format('Y-m-d H:i:s'),
            'warning_delay' => 30
        ];
    }

    /////////////////////////////
    /// Broadcasting helpers
    /////////////////////////////

    public function broadcastStart()
    {
        event(new ShutdownStarted());
    }

    public function broadcastEnd()
    {
        event(new ShutdownEnded());
    }

}
