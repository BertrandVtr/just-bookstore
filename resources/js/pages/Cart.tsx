import { CartItemInterface } from "../types";
import { removeItemFromCart, selectTotal, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";


const Cart = () => {
    const cart = useAppSelector(state => state.cart);
    const total = useAppSelector(selectTotal);
    const dispatch = useAppDispatch();

    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            <div className="bg-white shadow-lg rounded-lg p-6">
                {cart.cartItems.length > 0 ? (
                    <>
                        {cart.cartItems.map((item) =>
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQuantity={(id: number, quantity: number) => dispatch(updateQuantity({ id, quantity }))}
                                removeItem={(id: number) => dispatch(removeItemFromCart(id))}
                            />
                        )}
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-xl font-bold">Total</div>
                            <div className="text-xl">${total}</div>
                        </div>
                        <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg">
                            Proceed to Checkout
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>
        </>
    );
};

const CartItem = ({ item, updateQuantity, removeItem }: {item: CartItemInterface, updateQuantity: Function, removeItem: Function}) => {
    return (
        <div key={item.id} className="flex justify-between items-center border-b py-4">
            <div className="text-lg">{item.title}</div>
            <div className="flex items-center">
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
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
