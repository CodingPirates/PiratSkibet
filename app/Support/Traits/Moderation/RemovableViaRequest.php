<?php

namespace App\Support\Traits\Moderation;


trait RemovableViaRequest
{

    public function removalHasBeenRequested()
    {
        return !$this->isDeleted()
            && $this->moderationCase()->whereHas('requests', function ($q) {
                return $q->unresolvedRemovalRequestForUserId($this->getResponsibleUserId());
            })
            ->exists();
    }

}
