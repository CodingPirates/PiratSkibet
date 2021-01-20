<?php

namespace App\Jobs\Moderation;

use App\Models\Moderation\ModerationCase;
use App\Support\Services\Moderation\Actions\ModerateAutomatically;
use Closure;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class AutomaticallyModerateCase implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $case;

    /**
     * Create a new job instance.
     *
     * @param ModerationCase $case
     */
    public function __construct(ModerationCase $case)
    {
        $this->case = $case;

        self::onQueue('system');
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->case->needsAutomaticResolution()) {
            foreach ($this->case->moderateable->getAutomaticResolutionActions($this->case->requestsHaveReachedModerationThreshold()) as $action => $params) {
                $this->case->performModeration($action, 'Automatic Moderation', ...$params);
            }

            $this->case->performModeration(ModerateAutomatically::class);
        }
    }
}
