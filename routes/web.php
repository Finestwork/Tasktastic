<?php

use App\Http\Controllers\LandingPageController;
use App\Http\Controllers\PersonalController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', [LandingPageController::class, 'index'])->middleware('auth');
Route::get('/personal', [LandingPageController::class, 'index'])->middleware('auth');
Route::post('/check-user', [LandingPageController::class, 'loggedInUser']);

Route::prefix('/todo')->group(function(){
    Route::post('/create', [TaskController::class, 'save']);

    Route::prefix('/personal')->group(function(){
        Route::post('/all', [PersonalController::class, 'all']);
        Route::post('/update', [PersonalController::class, 'update']);
        Route::post('/update-progress', [PersonalController::class, 'updateProgress']);
    });

});


require __DIR__.'/auth.php';
