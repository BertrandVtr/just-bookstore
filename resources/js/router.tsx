import { createBrowserRouter } from "react-router-dom";
import Catalog from "./pages/Catalog";
import Cart from "./pages/Cart";
import PageLayout from "./components/PageLayout";

const router = createBrowserRouter([
    {
        element: <PageLayout/>,
        children: [
            {
                path: '/',
                element: <Catalog/>,
            },
            {
                path: '/cart',
                element: <Cart/>
            },
        ]
    },
])

export default router;
