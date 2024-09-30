import { Book } from "./Book.ts";
import { Cart } from "./Cart.ts";

export interface CartItem {
    id: number,
    created_at: Date,
    updated_at: Date,
    quantity: number,
    book_id: number,
    cart_id: number,
    book?: Book,
    cart?: Cart,
}
