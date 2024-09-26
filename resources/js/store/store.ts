import { configureStore, StateFromReducersMapObject } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

function loadState(): RootState | null {
    const storeState = localStorage.getItem('storeState')

    return storeState ? JSON.parse(storeState) : null
}

function storeState() {
    localStorage.setItem('storeState', JSON.stringify(store.getState()))
}

const reducer = { cart: cartReducer };

const store = configureStore({
    reducer,
    preloadedState: loadState()
});

store.subscribe(storeState)

export type RootState = StateFromReducersMapObject<typeof reducer>
export type AppDispatch = typeof store.dispatch;

export default store;
