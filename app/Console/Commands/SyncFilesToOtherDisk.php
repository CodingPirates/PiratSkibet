<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;
use \App\Models\File;

class SyncFilesToOtherDisk extends Command
{
    protected $signature = 'files:sync-disk';

    protected $description = 'Command for syncing all files to specific disk';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $newDisk = 's3';

        File::all()
            ->each(function(File $file) use ($newDisk) {
                if(!$file->file_exists) {
                    return;
                }

                $stored = Storage::disk($newDisk)->put($file->path, $file->content);

                if($stored) {
                    $file->disk = $newDisk;
                    $file->save();
                }
            });
    }
}
