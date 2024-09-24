import Item from "../components/Item.tsx";
import { ItemInterface } from "../types.js";

const items: Array<ItemInterface> = [
    { id: 1, title: 'HP 1', price: 9.99, volume: 1 },
    { id: 2, title: 'HP 2', price: 9.99, volume: 2 },
    { id: 3, title: 'HP 3', price: 9.99, volume: 3 },
    { id: 4, title: 'HP 4', price: 9.99, volume: 4 },
    { id: 5, title: 'HP 5', price: 9.99, volume: 5 },
    { id: 6, title: 'HP 6', price: 9.99, volume: 6 },
    { id: 7, title: 'HP 7', price: 9.99, volume: 7 },
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
