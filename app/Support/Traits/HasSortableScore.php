<?php

namespace App\Support\Traits;

use Carbon\Carbon;
use Illuminate\Support\Collection;

trait HasSortableScore
{

    //////////////////////////////////
    /// Calculations
    //////////////////////////////////

    public function calculateSortingScore()
    {

        /// The finals sorting is a summation of different scores.
        /// They will not contribute equally to the final score, but is weighted.
        ///  - Freshness is a measure of how fresh the newest related data is.
        ///    It could factor in the amount of time since the model was created or when somebody last interacted with it.
        ///  - Popularity is a measure of the amount of activity on the resource
        ///  - Quality can be tricky to measure - but should mostly be determined by the amount of endorsements of the resource
        /// Each of these factors will decay over time. This in the end means - that an endorsement for instance might contribute less to the score over time.
        /// As the factors decay individually - they might also degrade and contribute less over time at different rates
        /// The decay factors should be thought of like: How much will this value decay for each day that passed since it was created

        $this->sort_score = array_sum($this->getSortScoreFactors());
        //dump(get_class($this), $this->id, $this->sort_score, $this->getSortScoreFactors());
        $this->save();
    }

    public function getSortScoreFactors()
    {
        return [
            'popularity' => $this->getSortPopularityScore(),
            'quality' => $this->getSortQualityScore(),
            'freshness' => $this->getSortFreshnessScore(),
        ];
    }

    //////////////////////////////////
    /// Popularity
    //////////////////////////////////

    public function getSortPopularityWeight()
    {
        /// How much should the popularity score contribute to the final score?
        return 2;
    }

    public function getSortPopularityScore()
    {
        return ($this->getContributionToRecentGlobalActivity() / ($this->getRecentGlobalActivity() ?: 1))* 100 * $this->getSortPopularityWeight();
    }

    public function getRecentGlobalActivity()
    {
        return 1;
    }

    public function getContributionToRecentGlobalActivity()
    {
        return 1;
    }

    //////////////////////////////////
    /// Freshness
    //////////////////////////////////

    public function getSortFreshnessAge()
    {
        return 0;
    }

    public function getSortFreshnessWeight()
    {
        return 0.4;
    }

    public function getSortFreshnessDecayFactor()
    {
        return 10;
    }

    public function getSortFreshnessScore()
    {

        $age_in_days = $this->getSortFreshnessAge();
        $decay_factor = $this->getSortFreshnessDecayFactor();

        $decay = $age_in_days * $decay_factor;

        $score = 100 - $decay;

        return max(0, $score) * $this->getSortFreshnessWeight();
    }

    //////////////////////////////////
    /// Quality
    //////////////////////////////////

    public function getSortQualityContributors()
    {

        /// Expected format: collect([
        ///    [
        ///        "date" => Carbon,
        ///        "amount" => Integer
        ///    ]
        /// ])

        if (method_exists($this, 'endorsements')) {
            $endorsements = $this->endorsements;

            return $endorsements
                ->groupBy(function ($endorsement) {
                    return $endorsement->updated_at->format('Y-m-d');
                })
                ->transform(function ($endorsements) {
                    return [
                        'date' => $endorsements->first()->updated_at->copy(),
                        'amount' => $endorsements->count()
                    ];
                });

        }

        return collect();
    }

    public function getSortQualityWeight()
    {
        /// How much should the quality score contribute to the final score?
        return 0.4;
    }

    public function getSortQualityDecayFactor()
    {
        /// How much will the score decay with for each day?
        return 0.4;
    }

    public function getSortQualityContributionMultiplier()
    {
        return 300;
    }

    public function getSortQualityScore()
    {

        $contributors = $this->getSortQualityContributors();

        if (!($contributors instanceof Collection) || $contributors->isEmpty()) {
            return 0;
        }

        return $contributors->sum(function ($contributor) {

            if (!isset($contributor['amount']) || !isset($contributor['date']) || !($contributor['date'] instanceof Carbon)) {
                return 0;
            }

            $contribution = ($contributor['amount'] * $this->getSortQualityContributionMultiplier());
            $decay = ($this->getSortQualityDecayFactor() * Carbon::today()->diffInDays($contributor['date']));

            if(empty($decay)) {
                $decay = 1;
            }

            return ($contribution / $decay) * $this->getSortQualityWeight();
        });
    }

}
