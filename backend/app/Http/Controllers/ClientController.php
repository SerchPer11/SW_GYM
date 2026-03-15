<?php

namespace App\Http\Controllers;

use App\Http\Services\ClientService;
use App\Models\Client;
use App\Http\Requests\StoreClientRequest;
use App\Http\Requests\UpdateClientRequest;
use App\Http\Resources\ClientResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    protected ClientService $clientService;
    /**
     * Display a listing of the resource.
     */

    public function __construct(ClientService $clientService)
    {
        $this->clientService = $clientService;
    }

    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $status = $request->input('currentStatus');
        $perPage = $request->input('perPage', 5);
        $query = Client::query()->with('user');

        if ($search) {
            $query->where('phone', 'like', "%{$search}%")
                ->orWhere('id', 'like', "%{$search}%")
                ->orWhereHas('user', function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('lastname', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
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
        try {
            $client = $this->clientService->createClient($request->validated());

            return (new ClientResource($client))
                ->additional(['message' => 'Cliente creado exitosamente!'])
                ->response()
                ->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el cliente', 'error' => $e->getMessage()], 500);
        }
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
        try {
            $this->clientService->updateClient($request->validated(), $client);

            return (new ClientResource($client))
                ->additional(['message' => 'Cliente actualizado exitosamente!']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el cliente', 'error' => $e->getMessage()], 500);
        }
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
