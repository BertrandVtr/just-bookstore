import { CartItemInterface } from "../types";
import { removeItemFromCart, selectCartItems, selectIsCartEmpty, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector, useCartTotal } from "../store/hooks";


const Cart = () => {
    const isCartEmpty = useAppSelector(selectIsCartEmpty);

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {
                isCartEmpty
                    ? <p className="text-gray-500">Your cart is empty.</p>
                    : <>
                        <CartItemList/>
                        <TotalSection/>
                    </>
            }
        </div>
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
            <button className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg">
                Proceed to Checkout
            </button>
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
        <div key={item.id} className="flex justify-between items-center border-b py-4">
            <div className="text-lg">{item.title}</div>
            <div className="flex items-center">
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={decrementQuantity}
                    disabled={item.quantity <= 1}
                >
                    -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                    className="bg-gray-200 text-gray-600 px-2 py-1 rounded-lg"
                    onClick={incrementQuantity}
                >
                    +
                </button>
            </div>
            <div className="text-lg">${itemTotalPrice}</div>
            <button
                className="text-red-500 ml-4"
                onClick={removeItem}
            >
                Remove
            </button>
        </div>
    );
}

export default Cart
