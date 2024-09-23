import Item from "../components/Item.tsx";
import { ItemInterface } from "../types.js";

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
        <body>
        <header className="bg-white shadow">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-xl font-bold">Just Bookstore</div>
                <div className="text-gray-700">
                    <a href="#" className="flex items-center">
                        <span className="ml-2">Cart (0)</span>
                    </a>
                </div>
            </nav>
        </header>

        <main className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Our Books</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item) => <Item {...item} />)}
            </div>

        </main>
        </body>
    );
};

export default Home;
