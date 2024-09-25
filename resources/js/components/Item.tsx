import { BookInterface } from "../types";
import { addItemToCart, selectCartItem, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Item = (item: BookInterface) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector(state => selectCartItem(state, item.id));

    const hasStock = item.stock - (cartItem?.quantity ?? 0) > 0;
    const addToCart = () => {
        if (hasStock) {
            cartItem
                ? dispatch(updateQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 }))
                : dispatch(addItemToCart(item));
        }
    };


    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="https://via.placeholder.com/200" alt="Product 1" className="w-full h-48 object-cover mb-4 rounded-lg"/>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-2">€{item.price}</p>
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                onClick={addToCart}
                disabled={!hasStock}
            >
                Add to Cart
            </button>
            <InStock hasStock={hasStock} className="mt-2"/>
        </div>
    )
}

const InStock = ({ hasStock, className }: {hasStock: boolean, className?: string}) => {
    const backgroundColor = hasStock ? 'bg-green-500' : 'bg-red-500';
    const textColor = hasStock ? 'text-green-500' : 'text-red-500';
    const text = hasStock ? 'Available' : 'Unavailable';

    return (
        <div className={`${className} flex items-center gap-2`}>
            <span className={`h-3 w-3 rounded-full ${backgroundColor}`}></span>
            <span className={`text-sm ${textColor}`}>{text}</span>
        </div>
    );
};
export default Item;
