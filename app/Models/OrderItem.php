<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    protected static function booted(): void
    {
        static::created(function (OrderItem $item) {
            $item->book()->decrement('stock', $item->quantity);
        });
    }

    protected $fillable = [
        'order_id',
        'book_id',
        'quantity',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }

    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
