import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import PageLayout from "./components/PageLayout";

const router = createBrowserRouter([
    {
        element: <PageLayout/>,
        children: [
            {
                path: '/',
                element: <Home/>,
            },
            {
                path: '/cart',
                element: <Cart/>
            },
        ]
    },
])

export default router;
