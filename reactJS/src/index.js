import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ErrorPage from "./Components/Error/error-page";
import { Provider } from "react-redux";
// import stores from "./stores";
import "bootstrap/dist/css/bootstrap.css";
// import store redux
import { store } from "./redux/store";
import Redirect from "./Components/Redirect/Redirect";
import VnPayRedirect from "./Components/Redirect/VnPayRedirect";
// lazy
const MainPage = lazy(() => import("./Components/MainPageFolder/MainPage"));
const Products = lazy(() => import("./Components/ProductFolder/Products"));
const AboutUs = lazy(() => import("./Components/AboutUsFolder/AboutUs"));
const Shopping = lazy(() => import("./Components/Shopping/Shopping"));
const Login = lazy(() => import("./Components/LoginFolder/Login"));
const Register = lazy(() => import("./Components/Register/Register"));
const ShipAddress = lazy(() => import("./Components/ShipAddress/ShipAddress"));
const ProductDetails = lazy(() =>
  import("./Components/ProductDetails/ProductDetails")
);
const OutfitDetail = lazy(() =>
  import("./Components/OutfitDetail/OutfitDetail")
);
const Outfits = lazy(() => import("./Components/Outfits/Outfits"));
const TypeProduct = lazy(() => import("./Components/TypeProduct/TypeProduct"));
const TypeProductDetail = lazy(() =>
  import("./Components/TypeProductDetail/TypeProductDetail")
);
const Blogs = lazy(() => import("./Components/Blogs/Blogs"));
const Search = lazy(() => import("./Components/Search/Search"));
const Account = lazy(() => import("./Components/Account/Account"));
const Home = lazy(() => import("./Components/Admin/Home/Home"));
const UserList = lazy(() => import("./Components/Admin/UserList/UserList"));
const User = lazy(() => import("./Components/Admin/User/User"));
const NewUser = lazy(() => import("./Components/Admin/NewUser/NewUser"));
const ProductList = lazy(() =>
  import("./Components/Admin/ProductList/ProductList")
);
const Product = lazy(() => import("./Components/Admin/Product/Product"));
const NewProduct = lazy(() =>
  import("./Components/Admin/NewProduct/NewProduct")
);
const TypeProductList = lazy(() =>
  import("./Components/Admin/TypeProductList/TypeProductList")
);
const TypeProductEdit = lazy(() =>
  import("./Components/Admin/TypeProductEdit/TypeProductEdit")
);
const NewTypeProduct = lazy(() =>
  import("./Components/Admin/NewTypeProduct/NewTypeProduct")
);
const OrderDetail = lazy(() => import("./Components/OrderDetail/OrderDetail"));
const BlogDetail = lazy(() => import("./Components/BlogDetail/BlogDetail"));
const Payment = lazy(() => import("./Components/Payment/Payment"));
const FavoriteProduct = lazy(() =>
  import("./Components/FavoriteProduct/FavoriteProduct")
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "MainPage",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <MainPage />
          </Suspense>
        ),
      },
      {
        path: "Products",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Products />,
          </Suspense>
        ),
      },
      {
        path: "AboutUs",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: "ShoppingCart",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Shopping />
          </Suspense>
        ),
      },
      {
        path: "FavoriteProduct",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <FavoriteProduct />
          </Suspense>
        ),
      },
      {
        path: "Login",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: "Register",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "ShipAddress",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ShipAddress />
          </Suspense>
        ),
      },
      {
        path: "Payment",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Payment />
          </Suspense>
        ),
      },
      {
        path: "Outfits",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Outfits />
          </Suspense>
        ),
      },
      {
        path: "Blogs",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Blogs />
          </Suspense>
        ),
      },
      {
        path: "Blogs/:blogID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <BlogDetail />
          </Suspense>
        ),
      },
      {
        path: "Account",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Account />
          </Suspense>
        ),
      },
      {
        path: "Products/:productID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductDetails />
          </Suspense>
        ),
      },
      {
        path: "Products/Type/:typeID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TypeProduct />
          </Suspense>
        ),
      },
      {
        path: "Products/TypeDetail/:typedetailID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TypeProductDetail />
          </Suspense>
        ),
      },
      {
        path: "Outfits/:outfitID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <OutfitDetail />
          </Suspense>
        ),
      },
      {
        path: "OrderDetail/:orderID",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <OrderDetail />
          </Suspense>
        ),
      },
      {
        path: "Search",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Search />
          </Suspense>
        ),
      },
      {
        path: "Admin",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "Admin/Users",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <UserList />
          </Suspense>
        ),
      },
      {
        path: "Admin/User/:userId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <User />
          </Suspense>
        ),
      },
      {
        path: "Admin/NewUser",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NewUser />
          </Suspense>
        ),
      },
      {
        path: "Admin/TypeProducts",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TypeProductList />
          </Suspense>
        ),
      },
      {
        path: "Admin/TypeProduct/:typeProductId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <TypeProductEdit />
          </Suspense>
        ),
      },
      {
        path: "Admin/NewTypeProduct",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NewTypeProduct />
          </Suspense>
        ),
      },
      {
        path: "Admin/Products/:typeProductId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <ProductList />
          </Suspense>
        ),
      },
      {
        path: "Admin/Product/:productId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: "Admin/NewProduct/:typeProductId",
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <NewProduct />
          </Suspense>
        ),
      },
      {
        path: "MOMO/Checkout/Redirect",
        element: <Redirect />,
      },
      {
        path: "VnPay/Checkout/Redirect",
        element: <VnPayRedirect />,
      },
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
