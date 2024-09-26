import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartItemInterface } from '../types';
import * as cartApiClient from "../api/cartApiClient";

interface CartState {
    items: CartItemInterface[],
    discount: number,
    discountPrice: number,
    totalPrice: number,
    completeSagaDiscount: number,
    pairedVolumesDiscount: number,
}

const initialState: CartState = {
    items: [],
    discount: 0,
    discountPrice: 0,
    totalPrice: 0,
    completeSagaDiscount: 0,
    pairedVolumesDiscount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            console.log(state, action.payload);
            const { complete_saga_discount, discount, discount_price, paired_volumes_discount, total_price, items } = action.payload;

            return {
                ...state,
                items,
                discount,
                discountPrice: discount_price,
                totalPrice: total_price,
                completeSagaDiscount: complete_saga_discount,
                pairedVolumesDiscount: paired_volumes_discount,
            }
        },
        clearCart: () => {
            return {
                ...initialState
            }
        }
    },
    selectors: {
        selectCart: (state) => state,
        selectCartItems: (state) => state.items,
        selectTotal: (state) => state.totalPrice,
        selectTotalItems: (state) => state.items.reduce((total, { quantity }) => total + quantity, 0),
        selectCartItem: (state, bookId) => state.items.find((item) => item.book.id === bookId),
        selectIsCartEmpty: (state) => !state.items.length
    }
});

export const { setCart, clearCart } = cartSlice.actions;
export const { selectTotal, selectCartItems, selectTotalItems, selectCartItem, selectIsCartEmpty, selectCart } = cartSlice.selectors;

export const fetchCurrentCart = createAsyncThunk(
    'cart/fetchCurrentCart',
    async (_arg, { dispatch }) => {
        const cart = await cartApiClient.getCurrentCart();
        dispatch(setCart(cart));
    }
)

export const updateCartItemQuantity = createAsyncThunk<void, {bookId: number, quantity: number}>(
    'cart/updateCartItemQuantity',
    async ({ bookId, quantity }, { dispatch }) => {
        const cart = await cartApiClient.updateCartItemQuantity(bookId, quantity);
        dispatch(setCart(cart));
    }
)

export const removeCartItem = createAsyncThunk<void, number>(
    'cart/removeCartItem',
    async (bookId, { dispatch }) => {
        const cart = await cartApiClient.removeCartItem(bookId);
        dispatch(setCart(cart))
    }
)

export default cartSlice.reducer;
