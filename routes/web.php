<?php

use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->middleware('auth');
Route::get('/personal', [LandingPageController::class, 'index'])->middleware('auth');

Route::post('/check-user', [LandingPageController::class, 'loggedInUser']);

require __DIR__.'/auth.php';
