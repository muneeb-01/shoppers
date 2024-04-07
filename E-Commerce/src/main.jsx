import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Home from "./Components/HOME/Home.jsx";
import Men from "./Components/MEN/men.jsx";
import Kids from "./Components/KID/kids.jsx";
import Women from "./Components/WOMEN/women.jsx";
import Cart from "./Components/Cart.jsx";
import Login from "./Components/Login.jsx";
import UserApp from "./Components/UserInterface/UserApp.jsx";
import UserProfile from "./Components/UserInterface/UserProfile.jsx";
import UserSetting from "./Components/UserInterface/UserSetting.jsx";
import SingleProduct from "./Components/MAIN/SingleProductPage";
import UserOrderHistory from "./Components/UserInterface/UserOrderHistory.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import Store from "./Store/index.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/men",
        element: <Men />,
      },
      {
        path: "/Shop/:itemId/:name",
        element: <SingleProduct />,
      },
      {
        path: "/women",
        element: <Women />,
      },
      {
        path: "/Kids",
        element: <Kids />,
      },
      {
        path: "/Shop",
        element: <Home />,
      },
      {
        path: "/Cart",
        element: <Cart />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        path: "/user",
        element: <UserApp />,
        children: [
          {
            path: "/user",
            element: <UserProfile />,
          },
          {
            path: "/user/setting",
            element: <UserSetting />,
          },
          {
            path: "/user/orderHistory",
            element: <UserOrderHistory />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
