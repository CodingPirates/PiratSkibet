<?php

namespace App\Support\Traits\Moderation;


use App\Models\Moderation\ModerationCase;
use App\Models\Moderation\ModerationRequest;
use App\Models\User\User;
use App\Support\Enums\ModerationReasons;
use App\Support\Services\Moderation\Actions\Open;
use Closure;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

trait HasModerationRequests
{

    public static function bootHasModerationRequests()
    {
        static::updated(function (Model $moderateable) {
            optional($moderateable->moderationCase)->triggerUpdatedEvent();
        });
    }

    /**
     * ModerationCase relation
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function moderationCase()
    {
        return $this->morphOne(ModerationCase::class, 'moderateable');
    }

    /**
     * Determine weather a User can flag the Moderateable entity
     * Prevents User from reporting himself, or reporting the same entity multiple times before it has been resolved
     *
     * @param User $user
     * @return bool
     */
    public function userCanFlag(User $user): bool
    {
        return $this->getResponsibleUserId() !== $user->id &&
            !$this->userHasUnresolvedModerationRequests($user);
    }

    public function userHasUnresolvedModerationRequests(User $user): bool
    {
        return $this->moderationCase()
            ->whereHas('requests', function ($q) use ($user) {
                return $q
                    ->where('reporter_id', $user->id)
                    ->resolved(false);
            })
            ->exists();
    }

    /**
     * Create the \App\Models\Moderation\ModerationRequest
     *
     * @param string $reason
     * @param string $comment
     */
    public function flag(string $reason, string $comment = null): void
    {
        $case          = $this->moderationCase ?? new ModerationCase();
        $case->user_id = $case->user_id ?? $this->getResponsibleUserId();

        $this->moderationCase()->save($case);

        $request              = new ModerationRequest();
        $request->reason      = $reason;
        $request->comment     = $comment;
        $request->reporter_id = optional(Auth::user())->id;

        $case->requests()->save($request);

        if (!$case->is_pending) {
            $case->performModeration(Open::class, null, $request);
        }
    }

    public function randomModerationRequest(Faker $faker)
    {
        // 25% chance of a User getting reported
        if (rand(0, 99) < 25) {
            $reporters = User::query()
                ->where('id', '<>', $this->getResponsibleUserId())
                ->inRandomOrder()
                ->limit(rand(1, 5))
                ->get()
                ->each(function ($reporter) use ($faker) {
                    Auth::onceUsingId($reporter->id);

                    $this->load('moderationCase');

                    $this->flag(
                        $faker->randomElement(ModerationReasons::values()),
                        $faker->sentences(rand(1, 5), true)
                    );
                });
        }
    }

    // This works as a workaround for Moderateable models which don't have SoftDeletes
    // We need this specifically for the moderateable (morphTo()) relation on ModerationCase
    public function scopeWithTrashed($q)
    {
        return $q;
    }
}
