import { useAppSelector } from "../store/hooks";
import { Link, Outlet } from "react-router-dom";
import { selectTotalItems } from "../store/cartSlice";

const PageLayout = () => {
    // const nbItems = useAppSelector(state => state.cart.cartItems.reduce((total, { quantity }) => total + quantity, 0));

    const nbItems = useAppSelector(selectTotalItems);

    return (
        <>
            <header className="bg-white shadow">
                <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                    <Link to={'/'} className="text-xl font-bold">Just Bookstore</Link>
                    <div className="text-gray-700">
                        <Link to={'/cart'} className="flex items-center">
                            <span className="ml-2">Cart ({nbItems})</span>
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto py-10">
                <Outlet/>
            </main>
        </>
    )
}

export default PageLayout;
