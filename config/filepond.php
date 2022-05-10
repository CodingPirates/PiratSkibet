<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Local Temporary Path
    |--------------------------------------------------------------------------
    |
    | When initially uploading the files we store them in this path
    |
    */
    'temporary_files_path' => sys_get_temp_dir(),

    /*
    |--------------------------------------------------------------------------
    | Disk
    |--------------------------------------------------------------------------
    |
    | Here you may specify the filesystem disk that should be used.
    |
    */
    'disk' => env('FILEPOND_DISK', 'uploads'),

    /*
    |--------------------------------------------------------------------------
    | Location
    |--------------------------------------------------------------------------
    |
    | Here you may specify the location used for storage.
    |
    */
    'location' => 'filepond',

];
