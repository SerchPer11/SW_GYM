<?php

namespace App\Http\Requests\Users;

use Illuminate\Foundation\Http\FormRequest;
use App\Http\Requests\StoreUserRequest;

class StorePersonalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
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
            'hire_date' => 'required|date',
            'termination_date' => 'nullable|date|after_or_equal:hire_date',
            'is_active' => 'boolean',
        ];

        return array_merge($userRules, $clientRules);
    }

    public function attributes()
    {
        $userAttributes = (new StoreUserRequest())->attributes();

        $personalAttributes = [
            'user_id' => 'ID de usuario',
            'hire_date' => 'Fecha de contratación',
            'termination_date' => 'Fecha de terminación',
            'is_active' => 'Estado de actividad',
        ];

        return array_merge($userAttributes, $personalAttributes);
    }
}
