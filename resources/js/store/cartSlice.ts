// cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItemInterface, ItemInterface } from '../types';

interface CartState {
    cartItems: CartItemInterface[];
}

const initialState: CartState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<ItemInterface>) => {
            if (state.cartItems.every(({ id }) => id !== action.payload.id)) {
                state.cartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(({ id }) => id !== action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            if (action.payload.quantity > 0) {
                state.cartItems = state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
            }
        }
    }
});

export const { addItemToCart, removeItemFromCart, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;

export const selectTotal = (state: {cart: CartState}) => state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
export const selectCartIem = (state: {cart: CartState}, id: number) => state.cart.cartItems.find(({id: cartItemId}) => cartItemId === id);
