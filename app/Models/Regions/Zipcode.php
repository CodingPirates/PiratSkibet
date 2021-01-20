<?php

namespace App\Models\Regions;


use App\Support\Traits\Changeable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class Zipcode extends Model
{

    use Changeable;

    protected $primaryKey   = 'zipcode';
    public    $incrementing = false;

    /**
     * Regions relationship
     *
     * @return BelongsToMany
     */
    public function regions()
    {
        return $this->belongsToMany(Region::class)->using(RegionZipcode::class);
    }

    /**
     * Returns all Zipcodes
     *
     * @return Collection
     */
    public static function getAll()
    {
        return Cache::store('array')->rememberForever('all_zipcodes', function(){
            return Zipcode::query()->get();
        });
    }
}
