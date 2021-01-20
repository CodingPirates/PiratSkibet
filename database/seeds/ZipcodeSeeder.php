<?php

use Illuminate\Database\Seeder;

class ZipcodeSeeder extends Seeder
{

    public function run()
    {
        $zipcodes     = [];
        $csv_contents = file_get_contents(storage_path('app/misc/zipcodes.csv'));
        $lines        = preg_split("/(\r\n|\n|\r)/", $csv_contents);

        array_shift($lines); // Remove header line
        $now = now();

        foreach ($lines as $key => $line) {
            $line = trim($line);

            if (empty($line)) {
                continue;
            }

            $line = explode(";", $line);
            $zip = $line[4];

            // Some zipcodes exist multiple times in the file, but we need uniques
            $zipcodes[$zip] = [
                'zipcode'    => $zip,
                'city'       => $line[5],
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        \App\Models\Regions\Zipcode::insert($zipcodes);
    }
}
