<?php

namespace App\Traits;

use Carbon\Carbon;
use Illuminate\Support\Facades\Date;

trait DateFormat
{
    public function textFormatDate($date, $isComplete = false)
    {
        // if the date is null return null
        if (!$date) {
            return (object) [
                'raw' => null,
                'formatted' => null,
                'human' => null
            ];
        }
        // parse the date
        $parsed = $date instanceof Carbon ? $date : Carbon::parse($date);

        return (object)
        [
            'raw' => $isComplete ? $parsed->format('Y-m-d\TH:i') : $parsed->format('Y-m-d'),
            'formatted' => $isComplete ? $parsed->format('d-m-Y H:i:s') : $parsed->format('d-m-Y'),
            'human' => $isComplete ? $parsed->translatedFormat('j \d\e F \d\e Y H:i') : $parsed->translatedFormat('j \d\e F \d\e Y'),
        ];
    }

    public function startOfDay($date): ?string
    {
        if (empty($date)) return null;

        return Carbon::parse($date)->startOfDay()->format('Y-m-d');
    }

    public function endOfDay($date): ?string
    {
        if (empty($date)) return null;

        return Carbon::parse($date)->endOfDay()->format('Y-m-d');
    }
}
