<?php

namespace App\Http\Controllers\Security;

use App\Http\Controllers\Controller;
use App\Http\Resources\Security\PermissionResource;
use App\Http\Resources\Security\RoleResource;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\Security\StoreRoleRequest;
use App\Http\Requests\Security\UpdateRoleRequest;

class RoleController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('filters.search');
        $perPage = $request->input('perPage', 5);
        $query = Role::query()->with('permissions');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        $roles = $query->orderBy('id', 'desc')->paginate($perPage);

        return response()->json([
            'roles' =>RoleResource::collection($roles),
            'permissions' => PermissionResource::collection(Permission::all())
        ]);
    }

    public function store (StoreRoleRequest $request)
    {
        try {
            $role = Role::create($request->validated());

            return (new RoleResource($role))
                ->additional(['message' => 'Rol '. $role->name . ' creado exitosamente!'])
                ->response()
                ->setStatusCode(201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al crear el rol: ' . $e->getMessage()], 500);
        }
    }

    public function update (UpdateRoleRequest $request, Role $role) 
    {
        try {
            $role->update($request->validated());

            return (new RoleResource($role))
                ->additional(['message' => 'Rol '. $role->name . ' actualizado exitosamente!'])
                ->response()
                ->setStatusCode(200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al actualizar el rol: ' . $e->getMessage()], 500);
        }
    }

    public function destroy(Role $role)
    {
        try {
            $name = $role->name;
            $role->delete();

            return response()->json(['message' => 'Rol '. $name . ' eliminado exitosamente!'], 200);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar el rol: ' . $e->getMessage()], 500);
        }
    }
}
