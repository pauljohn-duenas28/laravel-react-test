<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function list()
    {
        return response()->json([
            'success' => true,
            'data' => Role::all(),
            'message' => 'data retrieved successfully.'
        ], 200);
    }
}
