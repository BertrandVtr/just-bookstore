import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookInterface, CartItemInterface } from '../types';

export interface CartState {
    cartItems: CartItemInterface[];
}

const initialState: CartState = {
    cartItems: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<BookInterface>) => {
            if (state.cartItems.every(({ id }) => id !== action.payload.id)) {
                state.cartItems = [...state.cartItems, { ...action.payload, quantity: 1 }];
            }
        },
        removeItemFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(({ id }) => id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{id: number; quantity: number}>) => {
            if (action.payload.quantity > 0) {
                state.cartItems = state.cartItems.map((item) => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item)
            }
        },
        clearCart: (state) => {
            state.cartItems = []
        },
    },
    selectors: {
        selectCartItems: (state) => state.cartItems,
        selectTotal: (state) => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
        selectCartItem: (state, id: number) => state.cartItems.find(({ id: cartItemId }) => cartItemId === id),
        selectIsCartEmpty: (state) => !state.cartItems.length,
    }
});

export const { addItemToCart, removeItemFromCart, updateQuantity, clearCart } = cartSlice.actions;
export const { selectTotal, selectCartItems, selectCartItem, selectIsCartEmpty } = cartSlice.selectors;

export default cartSlice.reducer;
