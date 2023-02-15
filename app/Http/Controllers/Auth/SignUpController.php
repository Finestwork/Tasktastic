<?php

namespace App\Http\Controllers\Auth;

use App\Helpers\SessionHelper;
use App\Http\Controllers\Controller;
use App\Mail\EmailVerification;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class SignUpController extends Controller
{
    public function create()
    {
        return view('landing');
    }

    public function store()
    {
        SessionHelper::avoidCSRF();

        request()->validate([
            'firstName' => 'required|string',
            'lastName' => 'required|string',
            'email' => 'required|unique:users,email',
            'password' => 'required|string',
        ]);

       $USER = User::query()
            ->create([
                'first_name' => request()->firstName,
                'last_name' => request()->lastName,
                'email' => request()->email,
                'password' => encrypt(request()->password),
            ]);

       Auth::login($USER);

       return response()->json($USER);
    }
}
