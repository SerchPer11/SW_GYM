<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use App\Http\Requests\Security\StorePermissionRequest;
use App\Http\Requests\Security\UpdatePermissionRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use App\Http\Resources\Security\PermissionResource;
use App\Models\Security\Module;

class PermissionController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $perPage = $request->input('perPage', 5);
        $query = Permission::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $permissions = $query->orderBy('id', 'desc')->paginate($perPage);

        return PermissionResource::collection($permissions)
            ->additional([
                'modules' => Module::orderBy('name')->get(['id', 'name', 'key']),
            ]);
    }

    public function store (StorePermissionRequest $request)
    {
        try {
            $permission = Permission::create($request->validated());

            return (new PermissionResource($permission))
                ->additional(['message' => 'Permiso '. $permission->name . ' creado exitosamente!'])
                ->response()
                ->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el permiso: ' . $e->getMessage()], 500);
        }
    }

    public function update (UpdatePermissionRequest $request, Permission $permission) 
    {
        try {
            $permission->update($request->validated());

            return (new PermissionResource($permission))
                ->additional(['message' => 'Permiso '. $permission->name . ' actualizado exitosamente!'])
                ->response()
                ->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el permiso: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Permission $permission)
    {
        try {
            $name = $permission->name;
            $permission->delete();

            return response()->json(['message' => 'Permiso '. $name . ' eliminado exitosamente!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el permiso: ' . $e->getMessage()], 500);
        }
        
    }
}
