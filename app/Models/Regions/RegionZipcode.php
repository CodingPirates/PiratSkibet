<?php

namespace App\Models\Regions;


use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Collection;

class RegionZipcode extends Pivot
{

    use Changeable;

    /**
     * @param array $regions
     * @return Collection
     */
    public static function getZipsForRegions(array $regions)
    {
        return static::whereIn('region_id', $regions)
            ->distinct()
            ->pluck('zipcode_zipcode');
    }

}
