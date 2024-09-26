<?php

namespace App\Http\Resources;

use App\Services\OrderDiscount;
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
        $discount = OrderDiscount::from($this->items);

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
