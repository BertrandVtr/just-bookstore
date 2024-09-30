import { CartItem } from "../models/CartItem.ts";
import { updateBook } from "../repositories/BookRepository.ts";

export async function updateBooksStock(cartItems: CartItem[]): Promise<boolean> {
    const promises = cartItems.map(async cartItem => updateBook(cartItem.book_id, { stock: Math.max(0, cartItem.book!.stock - cartItem.quantity )}))
    const results = await Promise.all(promises);

    return results.every(book => !!book);
}
