<?php

namespace App\Http\Services;

use App\Models\Users\User;
use App\Models\Users\Client;
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
                'phone' => $validated['phone'] ?? null,
                'inscription_date' => $validated['inscription_date'] ?? now()->toDateString(),
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
                'phone' => $validated['phone'] ?? $client->phone,
                'inscription_date' => $validated['inscription_date'] ?? $client->inscription_date,
                'expiration_date' => array_key_exists('expiration_date', $validated)
                    ? $validated['expiration_date']
                    : $client->expiration_date,
                'is_active' => $validated['is_active'] ?? $client->is_active,
            ]);
        });
    }
}
