<?php

namespace App\Http\Resources;

use App\Services\CartDiscount;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $discount = CartDiscount::from($this->resource);

        return [
            'items' => $this->items,
            'total_price' => $discount->totalPrice(),
            'discount' => $discount->totalDiscount(),
            'discount_price' => $discount->totalDiscountedPrice(),
            'complete_saga_discount' => $discount->completeSagaDiscount(),
            'paired_volumes_discount' => $discount->pairedVolumesDiscount(),
        ];
    }
}
