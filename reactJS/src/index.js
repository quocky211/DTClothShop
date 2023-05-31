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
import Search from "./Components/Search/Search";
import Account from "./Components/Account/Account";
import Home from "./Components/Admin/Home/Home";
import UserList from "./Components/Admin/UserList/UserList";
import User from "./Components/Admin/User/User";
import NewUser from "./Components/Admin/NewUser/NewUser";
import ProductList from "./Components/Admin/ProductList/ProductList";
import Product from "./Components/Admin/Product/Product";
import NewProduct from "./Components/Admin/NewProduct/NewProduct";
import TypeProductList from "./Components/Admin/TypeProductList/TypeProductList";
import TypeProductEdit from "./Components/Admin/TypeProductEdit/TypeProductEdit";
import NewTypeProduct from "./Components/Admin/NewTypeProduct/NewTypeProduct";
import OrderDetail from "./Components/OrderDetail/OrderDetail";
import BlogDetail from "./Components/BlogDetail/BlogDetail";
import { Provider } from "react-redux";
// import stores from "./stores";
import "bootstrap/dist/css/bootstrap.css";

import Payment from "./Components/Payment/Payment";
import FavoriteProduct from "./Components/FavoriteProduct/FavoriteProduct";
// import store redux
import { store } from "./redux/store";
import  Redirect  from './Components/Redirect/Redirect';

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
        path: "Blogs/:blogID",
        element: <BlogDetail />,
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
        path: "OrderDetail/:orderID",
        element: <OrderDetail />,
      },
      {
        path: "Search",
        element: <Search />,
      },
      {
        path: "Admin",
        element: <Home />,
      },
      {
        path: "Admin/Users",
        element: <UserList />,
      },
      {
        path: "Admin/User/:userId",
        element: <User />,
      },
      {
        path: "Admin/NewUser",
        element: <NewUser />,
      },
      {
        path: "Admin/TypeProducts",
        element: <TypeProductList />,
      },
      {
        path: "Admin/TypeProduct/:typeProductId",
        element: <TypeProductEdit />,
      },
      {
        path: "Admin/NewTypeProduct",
        element: <NewTypeProduct />,
      },
      {
        path: "Admin/Products/:typeProductId",
        element: <ProductList />,
      },
      {
        path: "Admin/Product/:productId",
        element: <Product />,
      },
      {
        path: "Admin/NewProduct/:typeProductId",
        element: <NewProduct />,
      },
      {
        path: "/MOMO/Checkout/Redirect",
        element: <Redirect />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
