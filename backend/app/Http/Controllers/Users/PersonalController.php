<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\Users\Personal;
use Illuminate\Http\Request;
use App\Http\Resources\Users\PersonalResource;
use App\Http\Requests\Users\StorePersonalRequest;
use App\Http\Requests\Users\UpdatePersonalRequest;
use App\Http\Services\PersonalService;

class PersonalController extends Controller
{
    protected PersonalService $personalService;

    public function __construct()
    {
        $this->personalService = new PersonalService();
    }

    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $status = $request->input('currentStatus');
        $perPage = $request->input('perPage', 5);
        $query = Personal::query()->with('user');

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

        return PersonalResource::collection($clients);
    }

    public function store(StorePersonalRequest $request)
    {
        try{
            $personal = $this->personalService->createPersonal($request->validated());
            
            return (new PersonalResource($personal))
                ->additional(['message' => $personal->name . ' se ha unido al equipo!'])
                ->response();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al crear el personal: ' . $e->getMessage()], 500);
        }
    }

    public function show(Personal $personal)
    {
        return new PersonalResource($personal);
    }

    public function update(UpdatePersonalRequest $request, Personal $personal)
    {
        try{
            $personal = $this->personalService->updatePersonal($request->validated(), $personal);
            
            return (new PersonalResource($personal))
                ->additional(['message' => 'La información de ' . $personal->name . ' ha sido actualizada!'])
                ->response();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al actualizar el personal: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Personal $personal)
    {
        try{
            $personal->delete();
            return response()->json(['message' => 'Personal eliminado correctamente']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error al eliminar el personal: ' . $e->getMessage()], 500);
        }
    }
}
