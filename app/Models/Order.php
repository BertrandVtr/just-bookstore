<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'total_price',
        'discount',
        'discount_price',
        'complete_saga_discount',
        'paired_volumes_discount',
    ];

    public function items()
    {
        return $this->hasMany(OrderItem::class);
    }
}
