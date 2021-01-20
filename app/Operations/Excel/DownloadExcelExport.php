<?php

namespace App\Operations\Excel;

use Closure;
use Exception;
use Maatwebsite\Excel\Facades\Excel;
use MorningTrain\Laravel\Resources\Support\Contracts\Operation;
use Illuminate\Contracts\Support\Responsable;

class DownloadExcelExport extends Operation
{
    private $exportableCallback;
    private $exportAs;

    public function handle($data)
    {
        throw_unless(
            $this->exportableCallback instanceof Closure,
            new Exception('Thats not a Closure')
        );

        $export = $this->exportableCallback->call($this);

        if($export instanceof Responsable) {
            return $export;
        }

        return Excel::download(
            $export,
            $this->exportAs
        );
    }

    public function exportable($exportable): DownloadExcelExport
    {
        $this->exportableCallback = $exportable;

        return $this;
    }

    public function exportAs(string $exportName)
    {
        $this->exportAs = $exportName;

        return $this;
    }

}
