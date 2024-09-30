import { Order } from "../models/Order.ts";
import { getCurrentCartWithDetails } from "./CartService.ts";
import { createOrder } from "../repositories/OrderRepository.ts";
import { updateCart } from "../repositories/CartRepository.ts";
import { updateBooksStock } from "./BookService.ts";

export async function createOrderFromCurrentCart(): Promise<Order> {
    const cart = await getCurrentCartWithDetails();

    const order = await createOrder({
        cart_id: cart.id,
        total_price: cart.total_price,
        discount: cart.discount,
        discount_price: cart.discount_price,
        complete_saga_discount: cart.complete_saga_discount,
        paired_volumes_discount: cart.paired_volumes_discount,
    })

    await updateCart(cart.id, { is_archived: true });
    await updateBooksStock(cart?.items ?? []);

    return order;
}
