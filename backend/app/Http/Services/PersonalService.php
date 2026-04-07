<?php

namespace App\Http\Services;

use App\Models\Users\User;
use App\Models\Users\Personal;
use Illuminate\Support\Facades\DB;

class PersonalService
{
    public function __construct()
    {
        //
    }

    public function createPersonal($validated)
    {
        return DB::transaction(function () use ($validated) {
            $user = User::Create([
                'name' => $validated['name'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'password' => bcrypt('12345678'),
                'gender' => $validated['gender'],
            ]);
            $user->syncRoles($validated['roles'] ?? []);
            return Personal::create([
                'user_id' => $user->id,
                'hire_date' => $validated['hire_date'] ?? now()->toDateString(),
                'termination_date' => $validated['termination_date'] ?? null,
                'is_active' => $validated['is_active'] ?? true,
            ]);
        });
    }

    public function updatePersonal($validated, $personal)
    {
        return DB::transaction(function () use ($validated, $personal) {
            $personal->user->update([
                'name' => $validated['name'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'phone' => $validated['phone'] ?? null,
                'gender' => $validated['gender'],
            ]);
            $personal->user->syncRoles($validated['roles'] ?? []);
            $personal->update([
                'is_active' => $validated['is_active'] ?? true,
                'hire_date' => $validated['hire_date'] ?? now()->toDateString(),
                'termination_date' => $validated['termination_date'] ?? null,
            ]);
            return $personal;
        });
    }

}