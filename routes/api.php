<?php

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/books', function (Request $request) {
    $limit = $request->input('limit', 10);

    $books = Book::paginate($limit);

    return response()->json($books);
});
