<?php

namespace App\Models\Regions;


use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Region extends Model
{

    use Changeable;

    //////////////////////////
    /// Zipcodes
    //////////////////////////

    /**
     * Zipcodes Relationship
     *
     * @return BelongsToMany
     */
    public function zipcodes()
    {
        return $this->belongsToMany(Zipcode::class)->using(RegionZipcode::class);
    }

    /**
     * Parses $zipcodes, and calls attach() on the zipcodes relation.
     * @see Region::parseZipcodes()
     *
     * @param array $zipcodes
     * @return void
     */
    public function attachZipcodes(array $zipcodes)
    {
        $zipcodes = static::parseZipcodes($zipcodes);

        $this->zipcodes()->attach($zipcodes);
    }

    /**
     * Parses $zipcodes, and calls detach() on the zipcodes relation.
     * @see Region::parseZipcodes()
     *
     * @param array $zipcodes
     * @return int
     */
    public function detachZipcodes(array $zipcodes)
    {
        $zipcodes = static::parseZipcodes($zipcodes);

        return $this->zipcodes()->detach($zipcodes);
    }

    /**
     * Parses $zipcodes, and calls sync() on the zipcodes relation.
     * @see Region::parseZipcodes()
     *
     * @param array $zipcodes
     * @return array
     */
    public function syncZipcodes(array $zipcodes)
    {
        $zipcodes = static::parseZipcodes($zipcodes);

        return $this->zipcodes()->sync($zipcodes);
    }

    /**
     * Parses an array of zipcodes, and return all existing zipcodes.
     * Supports "ranges" of zipcodes like [[5000, 5500]], and converts them to individual zipcodes.
     *
     * @example input $zipcodes = [5000, 5220, 5999, [1000, 2000]]
     * @example result [5000, 5220, 1473, 1799, 1974, 2000]
     *
     * @param array $zipcodes
     * @return array
     */
    public static function parseZipcodes(array $zipcodes)
    {
        $all_zipcodes = Zipcode::getAll();
        $ids = [];

        foreach ($zipcodes as $zipcode) {
            if (is_int($zipcode) && $all_zipcodes->contains('zipcode', $zipcode)) {
                $ids[]  = $zipcode;
                continue;
            }

            if (is_array($zipcode) && count($zipcode) >= 2) {
                $from = array_shift($zipcode);
                $to   = array_pop($zipcode);

                if (is_int($from) && is_int($to)) {
                    $ids = array_merge($ids,
                        $all_zipcodes->whereBetween('zipcode', [$from, $to])
                            ->pluck('zipcode')
                            ->all());
                }

                continue;
            }
        }

        return $ids;
    }
}
