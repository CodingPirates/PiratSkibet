<?php

namespace App\Jobs\Moderation;

use App\Models\Moderation\ModerationCase;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class PerformAsyncModeration implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $case;
    protected $action;
    protected $note;
    protected $args;

    /**
     * Create a new job instance.
     *
     * @param ModerationCase $case
     * @param string $action
     * @param string|null $note
     * @param array $args
     */
    public function __construct(ModerationCase $case, string $action, string $note = null, ...$args)
    {
        $this->case   = $case;
        $this->action = $action;
        $this->note   = $note;
        $this->args   = $args;

        self::onQueue('system');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $this->case->performModeration($this->action, $this->note, ...$this->args);
    }
}
