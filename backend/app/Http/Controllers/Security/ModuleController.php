<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Security\Module;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\Security\ModuleResource;
use App\Http\Requests\Security\StoreModuleRequest;
use App\Http\Requests\Security\UpdateModuleRequest;

class ModuleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $perPage = $request->input('perPage', 5);
        $query = Module::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $modules = $query->orderBy('id', 'desc')->paginate($perPage);

        return ModuleResource::collection($modules);
    }

    public function store(StoreModuleRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $validatedData['user_id'] = Auth::id();
            $module = Module::create($validatedData);

            return (new ModuleResource($module))
                ->additional(['message' => 'Módulo ' . $module->name . ' creado exitosamente!'])
                ->response()
                ->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el módulo: ' . $e->getMessage()], 500);
        }
    }

    public function update(UpdateModuleRequest $request, Module $module)
    {
        try {
            $module->update($request->validated());

            if (!$module->user_id) {
                $module->user_id = Auth::id();
                $module->save();
            }

            return (new ModuleResource($module))
                ->additional(['message' => 'Módulo ' . $module->name . ' actualizado exitosamente!'])
                ->response()
                ->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el módulo: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Module $module)
    {
        try {
            $name = $module->name;
            $module->delete();

            return response()->json(['message' => 'Módulo ' . $name . ' eliminado exitosamente!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el módulo: ' . $e->getMessage()], 500);
        }
    }
}
