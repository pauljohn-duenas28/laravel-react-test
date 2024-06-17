<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::create(['name' => 'Author']);
        Role::create(['name' => 'Editor']);
        Role::create(['name' => 'Subscriber']);
        Role::create(['name' => 'Administrator']);
    }
}
