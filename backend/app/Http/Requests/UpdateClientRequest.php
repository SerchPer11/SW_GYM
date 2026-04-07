<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateClientRequest extends FormRequest
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
        $clientUserId = $this->route('client')?->user_id;

        return [
            'name'                => ['sometimes', 'required', 'string', 'max:255'],
            'lastname'            => ['sometimes', 'required', 'string', 'max:255'],
            'gender'              => ['sometimes', 'required', 'string', 'in:male,female,other'],
            'email'               => ['sometimes', 'required', 'email', 'max:255', Rule::unique('users', 'email')->ignore($clientUserId)],
            'password'            => ['sometimes', 'required', 'string', 'min:8', 'confirmed'],
            'roles'               => ['sometimes', 'required', 'array'],
            'roles.*'             => ['string', 'exists:roles,id'],
            'user_id'             => 'nullable|exists:users,id',
            'inscription_date'    => 'nullable|date',
            'expiration_date'     => 'nullable|date|after_or_equal:inscription_date',
            'is_active'           => 'boolean',
        ];
    }

    public function attributes()
    {
        return [
            'name'             => 'nombre',
            'lastname'         => 'apellido',
            'gender'           => 'género',
            'email'            => 'correo electrónico',
            'password'         => 'contraseña',
            'roles'            => 'roles',
            'roles.*'          => 'rol',
            'user_id'          => 'ID de usuario',
            'inscription_date' => 'Fecha de inscripción',
            'expiration_date'  => 'Fecha de vencimiento',
            'is_active'        => 'Estado activo',
        ];
    }
}
