<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $status = $request->input('currentStatus');
        $perPage = $request->input('perPage', 10);
        $query = Client::query();

        if ($search) {
            $query->where('phone', 'like', "%{$search}%")
              ->orWhere('id', 'like', "%{$search}%");
        }

        if ($status !== null && $status !== 'all') {
            $query->where('is_active', $status);
        }

        $clients = $query->orderBy('id', 'desc')->paginate($perPage);

        return ClientResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $validated = $request->validated();
        $user = User::Create([
            'name' => $validated['name'],
            'lastname' => $validated['lastname'],
            'email' => $validated['email'],
            'password' => bcrypt('12345678'), // Contraseña por defecto, se recomienda cambiarla
        ]);
        $client = Client::create([
            'user_id' => $user->id,
            'phone' => $validated['phone'],
            'inscription_date' => $validated['inscription_date'],
            'expiration_date' => $validated['expiration_date'],
            'is_active' => $validated['is_active'] ?? true,
            'medical_notes' => $validated['medical_notes'],
        ]);

        return (new ClientResource($client))
        ->additional(['message' => 'Cliente creado exitosamente!'])
        ->response()
        ->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Client $client)
    {
        return new ClientResource($client);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateClientRequest $request, Client $client)
    {
        $client->update($request->validated());

        return (new ClientResource($client))
        ->additional(['message' => 'Cliente actualizado exitosamente!']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Client $client)
    {
        $client->delete();

        return response()->json(['message' => 'Cliente eliminado correctamente']);
    }
}
