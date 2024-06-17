<?php

use App\Http\Controllers\api\v1\RoleController;

Route::get('list', [RoleController::class, 'list']);
