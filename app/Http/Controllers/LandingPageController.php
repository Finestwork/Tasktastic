<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LandingPageController extends Controller
{
    public function index()
    {
        return view('landing');
    }

    // Get the currently logged-in user
    public function loggedInUser()
    {
        return response()->json(auth()->user());
    }
}
