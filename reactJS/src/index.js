import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Products from "./Components/ProductFolder/Products";
import AboutUs from "./Components/AboutUsFolder/AboutUs";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import MainPage from "./Components/MainPageFolder/MainPage";
import Shopping from "./Components/Shopping/Shopping";
import Login from "./Components/LoginFolder/Login";
import Register from "./Components/Register/Register";
import ShipAddress from "./Components/ShipAddress/ShipAddress";
import ErrorPage from "./Components/Error/error-page";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import OutfitDetail from "./Components/OutfitDetail/OutfitDetail";
import Outfits from "./Components/Outfits/Outfits";
import TypeProduct from "./Components/TypeProduct/TypeProduct";
import TypeProductDetail from "./Components/TypeProductDetail/TypeProductDetail";
import Blogs from "./Components/Blogs/Blogs";
import Account from "./Components/Account/Account";
import Dashboard from "./Components/Admin/Dashboard/Dashboard";
import { Provider } from "react-redux";
import stores from "./stores";
import "bootstrap/dist/css/bootstrap.css";

import Payment from "./Components/Payment/Payment";
import FavoriteProduct from "./Components/FavoriteProduct/FavoriteProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "MainPage",
        element: <MainPage />,
      },
      {
        path: "Products",
        element: <Products />,
      },
      {
        path: "AboutUs",
        element: <AboutUs />,
      },
      {
        path: "ShoppingCart",
        element: <Shopping />,
      },
      {
        path: "FavoriteProduct",
        element: <FavoriteProduct />,
      },
      {
        path: "Login",
        element: <Login />,
      },
      {
        path: "Register",
        element: <Register />,
      },
      {
        path: "ShipAddress",
        element: <ShipAddress />,
      },
      {
        path: "Payment",
        element: <Payment />,
      },
      {
        path: "Outfits",
        element: <Outfits />,
      },
      {
        path: "Blogs",
        element: <Blogs />,
      },
      {
        path: "Account",
        element: <Account />,
      },
      {
        path: "Products/:productID",
        element: <ProductDetails />,
      },
      {
        path: "Products/Type/:typeID",
        element: <TypeProduct />,
      },
      {
        path: "Products/TypeDetail/:typedetailID",
        element: <TypeProductDetail />,
      },
      {
        path: "Outfits/:outfitID",
        element: <OutfitDetail />,
      },
      {

        path: "Dashboard",
        element: <Dashboard />,
      },

        path: "Admin",
        element: <Dashboard/>
      }

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={stores}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
