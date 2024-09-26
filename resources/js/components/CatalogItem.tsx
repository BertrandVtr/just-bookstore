import { BookInterface } from "../types";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectCartItem, updateCartItemQuantity } from "../store/cartSlice";

const CatalogItem = (item: BookInterface) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector((state) => selectCartItem(state, item.id));

    const remainingStock = item.stock - (cartItem?.quantity ?? 0);
    const addToCart = () => {
        if (remainingStock > 0) {
            dispatch(updateCartItemQuantity({ bookId: item.id, quantity: (cartItem?.quantity ?? 0) + 1 }))
        }
    };


    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <img src={item.image || "https://via.placeholder.com/200"} alt="Product 1" className="w-full h-48 object-cover mb-4 rounded-lg"/>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-2">{item.price} €</p>
            <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                onClick={addToCart}
                disabled={remainingStock < 1}
            >
                Add to Cart
            </button>
            <InStock stock={remainingStock} className="mt-2"/>
        </div>
    )
}

const InStock = ({ stock, className }: {stock: number, className?: string}) => {
    const backgroundColor = stock ? 'bg-green-500' : 'bg-red-500';
    const textColor = stock ? 'text-green-500' : 'text-red-500';
    const text = stock ? `Available (${stock})` : 'Unavailable';

    return (
        <div className={`${className} flex items-center gap-2`}>
            <span className={`h-3 w-3 rounded-full ${backgroundColor}`}></span>
            <span className={`text-sm ${textColor}`}>{text}</span>
        </div>
    );
};
export default CatalogItem;
