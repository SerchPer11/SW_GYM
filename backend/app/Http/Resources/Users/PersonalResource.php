<?php

namespace App\Http\Resources\Users;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;

class PersonalResource extends JsonResource
{
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
            'hire_date' => $this->hire_date,
            'termination_date' => $this->termination_date,
            'is_active' => $this->is_active,
            'user' => new UserResource($this->whenLoaded('user')),
            'hire_date_formatted' => $this->textFormatDate($this->hire_date),
            'termination_date_formatted' => $this->textFormatDate($this->termination_date),
        ];
    }
}
