import { Discounts } from "../types/Discounts.ts";
import { Cart } from "./Cart.ts";

export interface Order extends Discounts {
    id: number,
    created_at: Date,
    updated_at: Date,
    cart_id: number,
    cart?: Cart
}
