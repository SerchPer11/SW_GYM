<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\DateFormat;

class ClientResource extends JsonResource
{
    use DateFormat;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'phone' => $this->phone,
        'inscription_date' => $this->textFormatDate($this->inscription_date),
        'expiration_date' => $this->textFormatDate($this->expiration_date),
        'status' => $this->is_active,
        'medical_notes' => $this->medical_notes,
        'user' => new UserResource($this->whenLoaded('user')),
    ];
    }
}
