<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\StoreUserRequest;

class StoreClientRequest extends FormRequest
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
        $userRules = (new StoreUserRequest())->rules();
        $clientRules = [
            'user_id' => 'nullable|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'inscription_date' => 'nullable|date',
            'expiration_date' => 'nullable|date|after_or_equal:inscription_date',
            'is_active' => 'boolean',
        ];

        return array_merge($userRules, $clientRules);
    }

    public function attributes()
    {
        $userAttributes = (new StoreUserRequest())->attributes();

        $clientAttributes = [
            'user_id' => 'ID de usuario',
            'phone' => 'Teléfono',
            'inscription_date' => 'Fecha de inscripción',
            'expiration_date' => 'Fecha de vencimiento',
            'is_active' => 'Estado activo',
        ];

        return array_merge($userAttributes, $clientAttributes);
    }
}
