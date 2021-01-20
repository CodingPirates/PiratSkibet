<?php

namespace App\Support\Traits\Meta;

use App\Support\Traits\CachesAttributes;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

trait HasMetaAttributes
{
    use CachesAttributes;

    protected static $metasToInsert = [];

    ////////////////////////////////
    // Configuration
    ////////////////////////////////

    private function getMetaModel()
    {
        if (isset($this->metaModel)) {
            return $this->metaModel;
        }

        return static::class . 'Meta';
    }

    private function getMetaForeignKey()
    {
        return strtolower(Str::snake((new \ReflectionClass($this))->getShortName())) . '_' . $this->getKeyName();
    }

    private function getMetaType($name)
    {
        return isset($this->metaTypes, $this->metaTypes[$name]) ? $this->metaTypes[$name] : null;
    }

    private function getMetaCast($name)
    {
        $type = $this->getMetaType($name);

        switch ($type) {
            case 'int':
            case 'integer':
                return 'SIGNED';
            case 'bool':
            case 'boolean':
                return 'UNSIGNED';
        }
    }

    ////////////////////////////////
    // Relationships
    ////////////////////////////////

    public function metaAttributes()
    {
        $model = $this->getMetaModel();

        return $this->hasMany($model, $this->getMetaForeignKey());
    }

    ////////////////////////////////
    // Scopes
    ////////////////////////////////

    public function scopeWithMeta($q, $name, $operator, $value = null)
    {
        if (count(func_get_args()) === 3) {
            $value = $operator;
            $operator = '=';
        }

        return $q->whereHas('metaAttributes', function ($q) use ($name, $operator, $value) {
            return $q->where('name', $name)->where('value', $operator, $value);
        });
    }

    public function scopeOrderByMeta(Builder $q, $name, $direction = 'asc')
    {
        // Get model details
        $model = static::class;
        $dummy = new $model;
        $table = $dummy->getTable();
        $id = $dummy->getKeyName();

        // Get meta model details
        $metaModel = $this->getMetaModel();
        $dummyMeta = new $metaModel;
        $meta_table = $dummyMeta->getTable();
        $meta_id = $dummyMeta->getKeyName();

        // Get foreign
        $foreign = $this->getForeignKey();

        // Apply to query
        $q->join($meta_table, "$meta_table.$foreign", '=', "$table.$id")->select("$table.*")->where("$meta_table.name", $name);

        $cast = $this->getMetaCast($name);

        isset($cast) ? $q->orderBy("CAST($meta_table.value as $cast)", $direction) : $q->orderBy("$meta_table.value", $direction);

        return $q;
    }

    ////////////////////////////////
    // Helpers
    ////////////////////////////////

    public function getMetaAttribute($name)
    {
        // TODO - caching
        //return $this->cache($name, function () use ($name) {
            return $this->metaAttributes->where('name', $name)->first();
        //});
    }

    public function getMeta($name, $default = null)
    {
        $attr = $this->getMetaAttribute($name);

        return $attr ? $attr->value : $default;
    }

    public function hasMeta($name)
    {
        return $this->getMetaAttribute($name) !== null;
    }

    public function metaUpdated($name, $value){

    }

    public function setMeta($name, $value, $type = null)
    {
        $model = $this->getMetaModel();
        $attr = $this->getMetaAttribute($name);

        if (is_null($attr)) {
            $attr = new $model;
            $attr->name = $name;

            // Cache new instance
            //$this->cache($name, $attr); // TODO - caching
        }

        $attr->type = $type ?? $this->getMetaType($name) ?? $attr->type ?? 'string';
        $attr->value = $value;
        $attr->{$this->getMetaForeignKey()} = $this->getKey();

        if ($attr->isDirty()) {
            $this->metaUpdated($attr->name, $attr->value);
        }

        $this->metaAttributes()->save($attr);
        $this->load('metaAttributes');
    }

    public function setMetas($metas, $skip_insert = false)
    {
        $model = $this->getMetaModel();

        $existing_metas = $this->metaAttributes->keyBy('name');

        if (!$metas->isEmpty()) {

            $now = Carbon::now();

            foreach ($metas as $name => $meta) {

                $type = $this->getMetaType($name);

                if (is_array($meta)) {
                    $type = $meta[1];
                    $meta = $meta[0];
                }

                if (is_null($type)) {
                    $type = 'string';
                }

                $existing_meta = $existing_metas->get($name);
                if ($existing_meta === null) {
                    static::$metasToInsert[] = [
                        $this->getForeignKey() => $this->getKey(),
                        'name' => $name,
                        'type' => $type,
                        'value' => $meta,
                        'created_at' => $now,
                        'updated_at' => $now,
                    ];
                } else {
                    $existing_meta->value = $meta;
                    $existing_meta->type = $type;
                    $existing_meta->save();
                }
            }

            if (!$skip_insert) {
                $this->insertPendingMetas();
            }

        }

    }

    public function cacheMetasFromLoaded()
    {
        $metas = $this->metaAttributes;

        if ($metas->isNotEmpty()) {
            foreach ($metas as $meta) {
                $this->cached_attributes[$meta->name] = $meta;
            }
        }
    }

    public static function insertPendingMetas()
    {
        $model = (new static())->getMetaModel();
        if (!empty(static::$metasToInsert)) {
            $chunks = array_chunk(static::$metasToInsert, 1000);
            foreach ($chunks as $chunk) {
                DB::table((new $model)->getTable())->insert($chunk);
            }
            static::$metasToInsert = [];
        }
    }

}
