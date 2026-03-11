<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\Api\AuthController;

//Api public routes
Route::post('/login', [AuthController::class, 'login']);

//Api protected routes
Route::middleware('auth:sanctum')->group(function () {
    //
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    Route::apiResource('clients', ClientController::class);
});

