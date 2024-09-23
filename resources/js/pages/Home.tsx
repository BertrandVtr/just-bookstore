import Item from "../components/Item.tsx";
import { ItemInterface } from "../types.js";
import PageLayout from "../components/PageLayout";

const items: Array<ItemInterface> = [
    {
        title: "Book 1",
        price: 49.99,
    },
    {
        title: "Book 2",
        price: 59.99,
    },
]

const Home = () => {
    return (
        <PageLayout>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => <Item {...item} />)}
            </div>
        </PageLayout>
    );
};

export default Home;
