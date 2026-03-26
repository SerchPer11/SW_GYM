<?php

namespace App\Http\Resources\Security;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Traits\DateFormat;

class ModuleResource extends JsonResource
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
            'name' => $this->name,
            'description' => $this->description,
            'key' => $this->key,
            'user_id' => $this->user_id,
            'user' => new UserResource($this->whenLoaded('user')),
            'created_at' => $this->textFormatDate($this->created_at),
            'updated_at' => $this->textFormatDate($this->updated_at),
        ];
    }
}
