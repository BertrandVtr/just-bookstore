import axios from "axios";
import { CartInterface, Order } from "../types";

const apiClient = axios.create({ baseURL: '/api/cart' });

export async function getCurrentCart(): Promise<CartInterface> {

    const { data } = await apiClient.get<CartInterface>('')

    return data;
}

export async function updateCartItemQuantity(bookId: number, quantity: number): Promise<CartInterface> {

    const { data } = await apiClient.patch<CartInterface>(`/item/${bookId}/quantity`, { quantity })

    return data;
}

export async function removeCartItem(bookId: number): Promise<CartInterface> {

    const { data } = await apiClient.delete<CartInterface>(`/item/${bookId}`)

    return data;
}

export async function makeOrder(): Promise<{ cart: CartInterface, order: Order}> {
    const { data } = await apiClient.post<{ cart: CartInterface, order: Order}>('/order');

    return data;
}
