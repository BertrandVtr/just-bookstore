import Item from "../components/Item.tsx";
import { ItemInterface } from "../types.js";

const items: Array<ItemInterface> = [
    { id: 1, title: 'Product 1', price: 10.99 },
    { id: 2, title: 'Product 2', price: 5.49 },
    { id: 3, title: 'Product 3', price: 7.99 },
]

const Home = () => {
    return (
        <>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item, index) => <Item key={index} {...item} />)}
            </div>
        </>
    );
};

export default Home;
