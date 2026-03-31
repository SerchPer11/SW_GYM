<?php

namespace App\Http\Requests\Security;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePermissionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:150', 'unique:permissions,name,' . $this->permission->id],
            'description' => ['required', 'string', 'max:500'],
            'guard_name' => ['required', 'string', 'max:255'],
            'module_key' => ['required', 'string', 'max:255'],
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'nombre',
            'description' => 'descripción',
            'guard_name' => 'guardia',
            'module_key' => 'clave del módulo',
        ];
    }
}
