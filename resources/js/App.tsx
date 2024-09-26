import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./bootstrap";
import "../css/app.css";

import router from "./router";

import store from "./store/store";
import { fetchCurrentCart } from "./store/cartSlice";

store.dispatch(fetchCurrentCart());

// @ts-ignore
ReactDOM.createRoot(document.getElementById("app")).render(
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
);
