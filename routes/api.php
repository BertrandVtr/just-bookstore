<?php

use App\Http\Controllers\CartController;
use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/books', function (Request $request) {
    $limit = $request->input('limit', 10);

    $books = Book::paginate($limit);

    return response()->json($books);
});

Route::controller(CartController::class)
    ->prefix('/cart')
    ->group(function () {
        Route::get('', 'show');
        Route::delete('', 'clear');
        Route::patch('/item/{book}/quantity', 'updateItemQuantity');
        Route::delete('/item/{book}', 'removeItem');
        Route::post('/order', 'makeOrder');
    });
