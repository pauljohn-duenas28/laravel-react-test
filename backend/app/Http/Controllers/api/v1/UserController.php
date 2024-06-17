<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * constructor
     *
     * @param UserService $UserService
     */
    public function __construct(private UserService $UserService)
    {
        $this->UserService = $UserService;
    }

    /**
     * store new user with multiple roles
     *
     * @param UserRequest $request
     * @return JsonResponse
     */
    public function store(UserRequest $request) : JsonResponse
    {
        try{

            $ValidatatedData = $request->validated();

            $result = $this->UserService->store($ValidatatedData);

            return response()->json([
                'success' => true,
                'data' => $result,
                'message' => 'data created successfully.'
            ], 200);

        }catch (\Throwable $e) {
            return response()->json([
                'error' => [
                    'description' => 'Parse error; ' .$e->getMessage() .' in file ' .$e->getFile() .'at line ' .$e->getLine()
                ]
            ], 500);
        }
    }

    /**
     * get all user by roles
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function show(Request $request): JsonResponse
    {
        $filters = [
            'sizePerpage' => $request['sizePerpage'],
            'search' => $request['search']
        ];

        $result = $this->UserService->show($filters);

        return response()->json([
            'success' => true,
            'data' => $result,
            'message' => 'data fetched successfully.'
        ], 200);
    }
}
