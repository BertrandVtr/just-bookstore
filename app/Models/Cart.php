<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    use HasFactory;

    protected $attributes = [
        'is_archived' => false,
    ];

    protected $fillable = [
        'is_archived',
    ];

    protected $casts = [
        'is_archived' => 'boolean',
    ];

    public function items()
    {
        return $this->hasMany(CartItem::class);
    }

    static public function current()
    {
        return self::latest()->where('is_archived', false)->firstOrCreate();
    }
}
