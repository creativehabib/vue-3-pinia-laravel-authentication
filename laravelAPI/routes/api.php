<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\MeController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use App\Http\Controllers\API\ResetPasswordController;
use App\Http\Controllers\API\ForgotPasswordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
//Route::post('login', [AuthController::class, 'login']);
//Route::post('logout', [AuthController::class, 'logout']);

Route::post('login',[AuthController::class, 'login']);
Route::post('register',[AuthController::class, 'register']);
Route::post('reset', ResetPasswordController::class);
Route::post('forgot', ForgotPasswordController::class);
Route::post('logout',   [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('me', MeController::class)->middleware('auth:sanctum');
Route::post('usersUpdate', [AuthController::class, 'profileUpdate'])->middleware('auth:sanctum');
Route::post('update_password', [AuthController::class, 'update_password'])->middleware('auth:sanctum');
Route::get('users',[AuthController::class, 'AllUsers']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('tasks', TaskController::class);
