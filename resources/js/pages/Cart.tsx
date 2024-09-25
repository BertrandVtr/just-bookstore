import { CartItemInterface, Order } from "../types";
import { clearCart, removeItemFromCart, selectCartItems, selectIsCartEmpty, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector, useCartTotal } from "../store/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createNewOrder } from "../api/orderApiClient";


const Cart = () => {
    const isCartEmpty = useAppSelector(selectIsCartEmpty);
    const cartItems = useAppSelector(selectCartItems);
    const dispatch = useAppDispatch();

    const [order, setOrder] = useState<Order | null>(null);

    async function makeOrder() {
        try {
            setOrder(await createNewOrder(cartItems));
            dispatch(clearCart());
        } catch (err) {
        }
    }

    return (
        <>
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                {
                    isCartEmpty
                        ? <p className="text-gray-500">Your cart is empty.<Link to="/" className="text-blue-400 underline"> Go Shopping ! </Link></p>
                        : <>
                            <CartItemList/>
                            <TotalSection/>
                            <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg" onClick={makeOrder}>
                                Proceed to Checkout
                            </button>
                        </>
                }
            </div>
            {order && <OrderResume order={order}></OrderResume>}
        </>
    );
};
const TotalSection = () => {
    const {
        total,
        totalWithoutDiscount,
        totalDiscount,
        sagaDiscount,
        pairedDiscount,
    } = useCartTotal();

    return (
        <>
            <div className="mt-6 text-sm">
                <p className="flex justify-between items-center">discount by saga ({sagaDiscount.items} items): <span
                    className="text-blue-400 italic">${sagaDiscount.amount.toFixed(2)}</span></p>
                <p className="flex justify-between items-center">discount by paired book ({pairedDiscount.items} items): <span
                    className="text-blue-400 italic">${pairedDiscount.amount.toFixed(2)}</span></p>
                <p className="flex justify-between items-center">Total discount: <span className="text-blue-400 italic">${totalDiscount.toFixed(2)}</span></p>
            </div>
            <div className="flex justify-between items-center mt-6">
                <div className="text-xl font-bold">Total</div>
                <div className="text-xl">
                    {total !== totalWithoutDiscount && <span className="line-through text-blue-400 font-thin">${totalWithoutDiscount.toFixed(2)}</span>}
                    <span className="ml-2">${total.toFixed(2)}</span>
                </div>
            </div>
        </>
    )
}

const CartItemList = () => {
    const cartItems = useAppSelector(selectCartItems);

    return cartItems.map((item) => <CartItem key={item.id} item={item}/>);
}

const CartItem = ({ item }: {item: CartItemInterface}) => {
    const dispatch = useAppDispatch();

    const decrementQuantity = () => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    const incrementQuantity = () => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    const removeItem = () => dispatch(removeItemFromCart(item.id));

    const itemTotalPrice = (item.price * item.quantity).toFixed(2);

    return (
        <div key={item.id} className="grid grid-cols-4 justify-between items-center border-b py-4">
            <div className="text-lg justify-start">{item.title}</div>
            <div className="flex items-center justify-center">
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onClick={decrementQuantity}
                    disabled={item.quantity <= 1}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    onClick={incrementQuantity}
                    disabled={item.quantity >= item.stock}
                >
                    +
                </button>
            </div>
            <div className="text-lg mx-auto">${itemTotalPrice}</div>
            <button
                className="text-red-500 ml-auto"
                onClick={removeItem}
            >
                Remove
            </button>
        </div>
    );
}

const OrderResume = ({ order }: {order: Order}) => {
    return (
        <div className="flex justify-center mt-6">
            <div className="bg-green-100 shadow-lg rounded-lg p-6 text-green-500">
                <p>Congratulation for your order <strong>#{order.id}</strong> !</p>
                {order.discount > 0 && <p>You benefited from <strong>${order.discount.toFixed(2)}</strong> discount on your last order.</p>}
            </div>
        </div>

    )
}

export default Cart
