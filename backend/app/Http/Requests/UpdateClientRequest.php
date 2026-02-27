<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'user_id' => 'sometimes|required|exists:users,id',
            'phone' => 'nullable|string|max:20',
            'inscription_date' => 'nullable|date',
            'expiration_date' => 'nullable|date|after_or_equal:inscription_date',
            'is_active' => 'boolean',
            'medical_notes' => 'nullable|string',
        ];
    }
}
