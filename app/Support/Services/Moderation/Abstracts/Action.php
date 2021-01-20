<?php

namespace App\Support\Services\Moderation\Abstracts;


use App\Models\Moderation\ModerationAction;
use App\Models\Moderation\ModerationCase;
use App\Support\Enums\ModerationActionType;
use App\Support\Services\Moderation\Actions\Resolve;
use Exception;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Support\Facades\Auth;

abstract class Action
{
    use ValidatesRequests;

    protected $meta = [];

    protected $case;
    protected $moderateable;

    public function __construct(ModerationCase $case)
    {
        if (!defined('static::TYPE')) {
            throw new Exception('Child class '.get_called_class().' failed to define constant TYPE.');
        }

        $this->case         = $case;
        $this->moderateable = $case->moderateable;
    }

    /**
     * Execute the action and log it to DB
     *
     * @param ModerationCase $case
     * @param string|null $note
     * @param array $args
     * @return mixed
     * @throws Exception
     */
    public static function execute(ModerationCase $case, string $note = null, ...$args)
    {
        $action = new static($case);

        if (!$action->canPerform()) return false;

        $result = $action->perform(...$args);

        if ($log = $action->logAction($note)) {
            $action->afterExecute($log);
        }

        return $result;
    }

    protected function afterExecute(ModerationAction $log)
    {
        if (
            static::TYPE === ModerationActionType::RESOLUTION
            && !$this->case->is_resolved
            && $log->user_id !== null // If moderation wasn't executed by a user, it was probably automatic.
        ) {
            $this->case->performAsyncModeration(Resolve::class, null, $log);
        }
    }

    protected function canPerform(): bool
    {
        return true;
    }

    /**
     * Perform the specific action
     *
     * @param array $args
     * @return mixed
     */
    protected abstract function perform(...$args);

    /**
     * Creates a \App\Models\Moderation\ModerationAction and saves to DB
     *
     * @param string|null $note
     * @return \Illuminate\Database\Eloquent\Model|false
     */
    protected function logAction(string $note = null)
    {
        return $this->case->actions()->save(
            $this->makeAction($note)
        );
    }

    /**
     * Make the action log instance
     *
     * @param string|null $note
     * @return ModerationAction
     */
    protected function makeAction(string $note = null): ModerationAction
    {
        $action               = new ModerationAction();
        $action->type         = static::TYPE;
        $action->action_class = static::class;
        $action->note         = $note;
        $action->meta         = $this->meta;
        $action->user_id      = optional(Auth::user())->id;

        return $action;
    }
}
