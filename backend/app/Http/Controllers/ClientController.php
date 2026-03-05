<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $clients = Client::all();

        return ClientResource::collection($clients);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreClientRequest $request)
    {
        $user = User::Create([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => bcrypt('12345678'), // Contraseña por defecto, se recomienda cambiarla
        ]);
        $client = Client::create([
            'user_id' => $user->id,
            'phone' => $request->phone,
            'inscription_date' => $request->inscription_date,
            'expiration_date' => $request->expiration_date,
            'is_active' => $request->is_active ?? true,
            'medical_notes' => $request->medical_notes,
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
