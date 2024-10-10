<?php

use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/resetPasswordUser', [AuthController::class, 'resetPasswordLoad']);
Route::post('/resetPasswordUser', [AuthController::class, 'resetPassword']);
