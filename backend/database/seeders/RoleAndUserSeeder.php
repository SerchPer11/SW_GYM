<?php

namespace Database\Seeders;

use App\Models\Users\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use App\Models\Security\Module;

class RoleAndUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();
        // Create a default admin user
        $admin = User::create([
            'name' => 'Admin',
            'lastname' => 'General',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('12345678'),
            'gender' => 'male',
            'email_verified_at' => now(),
        ]);
        // Create the 'clients' module and its permissions
        Module::create(['name' => 'Clientes', 'description' => 'Módulo de clientes', 'key' => 'clients', 'user_id' => 1]);

        Permission::create(['name' => 'clients.index', 'guard_name' => 'web', 'description' => 'Permiso para listar clientes', 'module_key' => 'clients']);
        Permission::create(['name' => 'clients.create', 'guard_name' => 'web', 'description' => 'Permiso para crear clientes', 'module_key' => 'clients']);
        Permission::create(['name' => 'clients.show', 'guard_name' => 'web', 'description' => 'Permiso para ver detalles de un cliente', 'module_key' => 'clients']);
        Permission::create(['name' => 'clients.update', 'guard_name' => 'web', 'description' => 'Permiso para actualizar clientes', 'module_key' => 'clients']);
        Permission::create(['name' => 'clients.destroy', 'guard_name' => 'web', 'description' => 'Permiso para eliminar clientes', 'module_key' => 'clients']);
        // Create the 'admin' role and assign all permissions to it
        $adminRole = Role::create([
            'name' => 'admin',
            'description' => 'Administrador',
        ]);
        // Assign all permissions to the admin role
        $adminRole->givePermissionTo(Permission::all());
        // Create the 'receptionist' role and assign specific permissions to it
        $receptionistRole = Role::create(['name' => 'receptionist']);
        Role::create(['name' => 'trainer', 'description' => 'Entrenador']);
        Role::create(['name' => 'client', 'description' => 'Cliente']);

        $receptionistRole->givePermissionTo([
            'clients.index',
            'clients.create',
            'clients.update',
            'clients.show',
        ]);

        $admin->assignRole('admin');
    }
}
