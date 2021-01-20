<?php

namespace App\Operations\Files;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use MorningTrain\Laravel\Resources\Operations\Crud\Read;
use ZipStream\Option\Archive;
use ZipStream\ZipStream;

class Download extends Read
{

    protected $from = null;

    public function from($value = null) {
        return $this->genericGetSet('from', $value);
    }

    public function handle($model_or_collection = null)
    {
        $item = parent::handle($model_or_collection);

        if($item === null) {
            return;
        }

        if($this->from) {
            $files = $item->{$this->from};

            if($files instanceof Collection) {

                return response()->streamDownload(function() use ($files) {

                    $opt = new Archive();

                    $opt->setContentType('application/octet-stream');

                    $zip = new ZipStream("uploads.zip", $opt);


                    foreach ($files as $file) {
                        try {
                            $file_stream = $file->storage->readStream($file->path);
                            $zip->addFileFromStream($file->filename, $file_stream);
                        }
                        catch (\Exception $e) {
                            Log::error("unable to read the file at storage path: $file->path and output to zip stream. Exception is " . $e->getMessage());
                        }

                    }

                    $zip->finish();
                }, 'uploads.zip');

            }

        }

    }

}
