<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserRole;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class UserService
{
    /**
     * store new user with multiple roles
     *
     * @param mixed $data
     * @return User
     */
    public function store(mixed $data)
    {
        DB::beginTransaction();

        try {
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email']
            ]);

            foreach($data['role_id'] as $id)
            {
                $UserRoles[] = [
                    'user_id' => $user->id,
                    'role_id' => $id
                ];
            }

            UserRole::insert($UserRoles);

            DB::commit();

            return $user;

        } catch (\Throwable $th) {
            DB::rollBack();
        }

    }

    /**
     * get all list of user by roles
     *
     * @param mixed $filters
     * @return LengthAwarePaginator
     */
    public function show(mixed $filters): LengthAwarePaginator
    {
        $paginator = UserRole::select('id', 'user_id', 'role_id')
        ->with('role', 'user')
        ->whereHas('role', function($query) use ($filters){
            $query->where('name', 'LIKE', '%' . $filters['search'] . '%');
        })
        ->paginate($filters['sizePerpage']);

        $paginator->getCollection()->transform(function($source) {
            return [
                'id' => $source->id,
                'name' => $source->user->name ?? null,
                'email' => $source->user->email ?? null,
                'role' => $source->role->name ?? null
            ];
        });

        return $paginator;
    }
}
