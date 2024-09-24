import { ItemInterface } from "../types";
import { addItemToCart, selectCartIem, updateQuantity } from "../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const Item = (item: ItemInterface) => {
    const dispatch = useAppDispatch();
    const cartItem = useAppSelector(state => selectCartIem(state, item.id));

    const addToCart = () => cartItem
        ? dispatch(updateQuantity({ id: cartItem.id, quantity: cartItem.quantity + 1 }))
        : dispatch(addItemToCart(item));

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="https://via.placeholder.com/200" alt="Product 1" className="w-full h-48 object-cover mb-4 rounded-lg"/>
            <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
            <p className="text-gray-600 mt-2">€{item.price}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={addToCart}>Add to Cart</button>
        </div>
    )
}

export default Item;
