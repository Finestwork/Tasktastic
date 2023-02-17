<?php

use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->middleware('auth');
Route::get('/personal', [LandingPageController::class, 'index'])->middleware('auth');
Route::post('/check-user', [LandingPageController::class, 'loggedInUser']);
Route::post('/todo/create', [TaskController::class, 'save']);

require __DIR__.'/auth.php';
