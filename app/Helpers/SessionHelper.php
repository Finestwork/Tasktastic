<?php

namespace App\Helpers;

use Illuminate\Session\TokenMismatchException;

class SessionHelper
{
    public static function avoidCSRF()
    {
        if(request()->header('x-csrf-token') !== session()->token()){
            throw new TokenMismatchException('CSRF token mismatch');
        }
    }
}
