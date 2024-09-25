<?php

use App\Http\Requests\StoreOrderRequest;
use App\Models\Book;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\OrderDiscount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/books', function (Request $request) {
    $limit = $request->input('limit', 10);

    $books = Book::paginate($limit);

    return response()->json($books);
});

Route::post('/orders', function (StoreOrderRequest $request) {
    $items = collect($request->input('items', []))->map(fn (array $item) => (new OrderItem())->fill($item));

    $orderDiscount = OrderDiscount::from($items);

    $order = Order::create([
        'total_price' => $orderDiscount->totalPrice(),
        'discount' => $orderDiscount->totalDiscount(),
        'discount_price' => $orderDiscount->totalDiscountedPrice(),
        'complete_saga_discount' => $orderDiscount->completeSagaDiscount(),
        'paired_volumes_discount' => $orderDiscount->pairedVolumesDiscount(),
    ]);

    $order->items()->saveMany($items);

    return response()->json($order);
});
