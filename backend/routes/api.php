<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Users\ClientController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Security\ModuleController;
use App\Http\Controllers\Security\RoleController;
use App\Http\Controllers\Security\PermissionController;

//Api public routes
Route::post('/login', [AuthController::class, 'login']);

//Api protected routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Security routes
    Route::prefix('security')->group(function () {
        Route::apiResource('modules', ModuleController::class);
        Route::apiResource('roles', RoleController::class);
        Route::apiResource('permissions', PermissionController::class);
    });

    // Users routes
    Route::prefix('users')->group(function () {
        // Route::get('personal', [ClientController::class, 'personal']);
        Route::apiResource('clients', ClientController::class);
    });
    
});

use Illuminate\Support\Facades\Artisan;

Route::get('/instalar-bd', function () {
    try {
        Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);
        return "¡ÉXITO! Base de datos migrada y poblada. Ya puedes borrar esta ruta.";
    } catch (\Exception $e) {
        return "Hubo un error: " . $e->getMessage();
    }
});

