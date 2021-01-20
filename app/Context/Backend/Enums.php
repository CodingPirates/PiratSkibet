<?php

namespace App\Context\Backend;


use App\Support\Enums\ExportableEnum;
use Illuminate\Support\Facades\Storage;
use MorningTrain\Laravel\Context\Context;

class Enums
{
    public function load()
    {
        $data = collect(Storage::disk('app')->files('Support\Enums'))
            ->filter(function ($file) {
                // Only use php files
                $end = '.php';

                return substr($file, -strlen($end)) === $end;

            })
            ->map(function ($file) {
                $file = rtrim($file, '.php');

                return '\\App\\Support\\Enums\\' . class_basename($file);
            })
            ->unique()
            ->filter(function ($class) {
                return (
                    class_exists($class) &&
                    (get_parent_class($class) === ExportableEnum::class) &&
                    $class::$export
                );
            })
            ->mapWithKeys(function ($enum) {
                return [$enum::basename() => $enum::export()];
            });

        Context::env(function () use ($data) {
            return [
                'enums' => $data->toArray(),
            ];
        });
    }
}
