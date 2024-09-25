<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin
 */
class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'saga',
        'volume',
        'image',
        'price',
        'stock',
    ];
}
