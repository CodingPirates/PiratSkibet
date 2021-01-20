<?php

namespace App\Support\Traits;


use App\Jobs\Sorting\CalculateSortScoreForModel;
use App\Models\User\User;
use App\Support\Enums\ReactionType;
use Illuminate\Support\Facades\Auth;

/**
 * @method \Illuminate\Database\Eloquent\Relations\HasMany reactions()
 */
trait Reactable
{

    public function endorsements()
    {
        return $this->reactions()->type(ReactionType::ENDORSEMENT);
    }

    public function my_endorsements()
    {
        return $this->reactions()->type(ReactionType::ENDORSEMENT)->mine();
    }

    public function likes()
    {
        return $this->reactions()->type(ReactionType::LIKE);
    }

    public function my_likes()
    {
        return $this->reactions()->type(ReactionType::LIKE)->mine();
    }

    /**
     * Get the related reaction class
     *
     * @return \Illuminate\Database\Eloquent\Model
     */
    protected function getNewReactionInstance()
    {
        $class = get_class($this->reactions()->getRelated());

        return new $class;
    }

    /**
     * Get the related reaction foreign key
     *
     * @return string
     */
    protected function getReactableForeignKey(): string
    {
        return $this->reactions()->getForeignKeyName();
    }

    protected function handleReaction()
    {

    }

    public function triggerReaction(string $type, bool $react = true, User $user = null)
    {
        $user = optional($user)->id ?? optional(Auth::user())->id;

        /** @var \Illuminate\Database\Eloquent\Model | null $reaction */
        $reaction = $this->reactions()->type($type)->user($user)->first();

        if ($reaction === null && $react === true) {
            $key = $this->getReactableForeignKey();

            $reaction          = $this->getNewReactionInstance();
            $reaction->{$key}  = $this->getKey();
            $reaction->user_id = $user;
            $reaction->type = $type;
            $reaction->save();

        } elseif ($reaction !== null && $react === false) {
            $reaction->delete();
        }

        $this->handleReaction();

        return [
            "count" => $this->reactions()->type($type)->count(),
        ];
    }

}
