import { getCurrentCart } from "../repositories/CartRepository.ts";
import { getCartItems } from "../repositories/CartItemRepository.ts";
import { calculateDiscounts } from "./DiscountsService.ts";
import { Discounts } from "../types/Discounts.ts";
import { Cart } from "../models/Cart.ts";

export async function getCurrentCartWithDetails(): Promise<Cart & Discounts> {
    const cart = await getCurrentCart();
    const items = await getCartItems(cart.id);
    const discount = calculateDiscounts(items);

    return {
        ...cart,
        ...discount,
        items
    };
}
