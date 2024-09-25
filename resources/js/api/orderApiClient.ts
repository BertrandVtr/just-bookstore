import axios from "axios";
import { CartItemInterface, Order } from "../types";

const apiClient = axios.create({ baseURL: '/api/orders' });

export async function createNewOrder(cartItems: CartItemInterface[]): Promise<Order> {

    const items = cartItems.map(item => ({
        book_id: item.id,
        quantity: item.quantity,
    }))

    const { data } = await apiClient.post<Order>('', { items })
    return data;
}
