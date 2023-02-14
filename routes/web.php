<?php

use App\Http\Controllers\LandingPageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index']);
Route::get('/login', [LandingPageController::class, 'index']);
Route::get('/signup', [LandingPageController::class, 'index']);

require __DIR__.'/auth.php';
