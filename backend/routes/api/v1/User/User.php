<?php

use App\Http\Controllers\api\v1\UserController;

Route::post('store', [UserController::class, 'store']);
Route::get('show', [UserController::class, 'show']);
