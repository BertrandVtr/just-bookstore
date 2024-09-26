<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::created(function (Order $order) {
            $order->cart->update(['is_archived' => true]);
            $order->cart->items()->each(function (CartItem $cartItem) {
                $cartItem->book()->decrement('stock', $cartItem->quantity);
            });
        });
    }

    protected $fillable = [
        'total_price',
        'discount',
        'discount_price',
        'complete_saga_discount',
        'paired_volumes_discount',
        'cart_id',
    ];

    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
