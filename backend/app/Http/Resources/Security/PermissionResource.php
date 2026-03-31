<?php

namespace App\Http\Resources\Security;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Traits\DateFormat;

class PermissionResource extends JsonResource
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
            'guard_name' => $this->guard_name,
            'module_key' => $this->module_key,
            'formatted_created_at' => $this->textFormatDate($this->created_at),
            'formatted_updated_at' => $this->textFormatDate($this->updated_at),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
