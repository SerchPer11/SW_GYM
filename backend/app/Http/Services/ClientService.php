<?php

namespace App\Http\Services;

use App\Models\Users\User;
use App\Models\users\Client;
use Illuminate\Support\Facades\DB;

class ClientService
{
    public function __construct()
    {
        //
    }

    public function createClient($validated)
    {
        return DB::transaction(function () use ($validated) {
            $user = User::Create([
                'name' => $validated['name'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'password' => bcrypt('12345678'),
                'roles' => 4,
                'gender' => $validated['gender'],
            ]);
            return Client::create([
                'user_id' => $user->id,
                'phone' => $validated['phone'],
                'inscription_date' => $validated['inscription_date'],
                'expiration_date' => $validated['expiration_date'],
                'is_active' => $validated['is_active'] ?? true,
            ]);
        });
    }

    public function updateClient($validated, $client)
    {
        return DB::transaction(function () use ($validated, $client) {
            $client->user()->update([
                'name' => $validated['name'],
                'lastname' => $validated['lastname'],
                'email' => $validated['email'],
                'gender' => $validated['gender'],
            ]);

            $client->update([
                'phone' => $validated['phone'],
                'inscription_date' => $validated['inscription_date'],
                'expiration_date' => $validated['expiration_date'],
                'is_active' => $validated['is_active'] ?? $client->is_active,
            ]);
        });
    }
}
