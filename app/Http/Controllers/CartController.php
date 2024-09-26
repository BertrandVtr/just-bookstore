<?php

namespace App\Http\Controllers;

use App\Http\Requests\IncrementCartItemQuantityRequest;
use App\Http\Resources\CartResource;
use App\Models\Book;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Services\OrderDiscount;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function show(): JsonResponse
    {
        return response()->json(new CartResource(Cart::current()));
    }

    public function clear(): JsonResponse
    {
        $cart = Cart::current();

        $cart->items()->delete();

        return response()->json(new CartResource($cart));
    }

    public function updateItemQuantity(IncrementCartItemQuantityRequest $request, Book $book): JsonResponse
    {
        $cart = Cart::current();

        $quantity = $request->get('quantity');

        $item = $cart->items()->where('book_id', $book->id)->firstOrCreate(['book_id' => $book->id]);

        $item->update(['quantity' => $quantity]);

        return response()->json(new CartResource($cart));
    }

    public function removeItem(Book $book): JsonResponse
    {
        $cart = Cart::current();

        $cart->items()->whereHas('book', fn ($query) => $query->whereId($book->id))->delete();

        return response()->json(new CartResource($cart));
    }

    public function makeOrder()
    {
        $cart = Cart::current();

        $items = $cart->items->map(fn ($item) => (new OrderItem())->fill($item->toArray()));

        $orderDiscount = OrderDiscount::from($items);

        $order = Order::create([
            'total_price' => $orderDiscount->totalPrice(),
            'discount' => $orderDiscount->totalDiscount(),
            'discount_price' => $orderDiscount->totalDiscountedPrice(),
            'complete_saga_discount' => $orderDiscount->completeSagaDiscount(),
            'paired_volumes_discount' => $orderDiscount->pairedVolumesDiscount(),
            'cart_id' => $cart->id,
        ]);

        $order->items()->saveMany($items);

        return response()->json([
            'order' => $order,
            'cart' => new CartResource(Cart::current()),
        ]);
    }
}
