import PageLayout from "../components/PageLayout";

import { useState } from 'react';

interface CartItem {
    id: number,
    name: string,
    price: number,
    quantity: number,
}

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([
        { id: 1, name: 'Product 1', price: 10.99, quantity: 1 },
        { id: 2, name: 'Product 2', price: 5.49, quantity: 2 },
        { id: 3, name: 'Product 3', price: 7.99, quantity: 1 },
    ]);

    const updateQuantity = (id: number, amount: number) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + amount } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <PageLayout>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map((item) => <CartItem key={item.id} item={item} updateQuantity={updateQuantity} removeItem={removeItem} />)}
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-xl font-bold">Total</div>
                            <div className="text-xl">${calculateTotal()}</div>
                        </div>
                        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg">
                            Proceed to Checkout
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </PageLayout>
    );
};

const CartItem = ({ item, updateQuantity, removeItem}: { item: CartItem, updateQuantity: Function, removeItem: Function}) => {
    return (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
            <div className="text-lg">{item.name}</div>
            <div className="flex items-center">
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, 1)}
                >
                    +
                </button>
            </div>
            <div className="text-lg">${(item.price * item.quantity).toFixed(2)}</div>
            <button
                className="text-red-500 ml-4"
                onClick={() => removeItem(item.id)}
            >
                Remove
            </button>
        </div>
    );
}

export default Cart
