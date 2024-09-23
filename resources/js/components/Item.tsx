import { ItemInterface } from "../types";

const Item = ({ title, price }: ItemInterface) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
            <img src="https://via.placeholder.com/200" alt="Product 1" className="w-full h-48 object-cover mb-4 rounded-lg"/>
            <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
            <p className="text-gray-600 mt-2">€{price}</p>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Add to Cart</button>
        </div>
    )
}

export default Item;
