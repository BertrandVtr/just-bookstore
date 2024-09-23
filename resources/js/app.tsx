import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import "./bootstrap";
import "../css/app.css";

import router from "./router";

// @ts-ignore
ReactDOM.createRoot(document.getElementById("app")).render(<RouterProvider router={router} />);
