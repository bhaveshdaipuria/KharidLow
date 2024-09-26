import UserAuthRoute from "../utils/auth/UserAuth";
import RoleAuthRoute from "../utils/auth/RoleAuth";
import NotFound from "../Components/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import Layout from "../Layout/Layout";
import ProductTable from "../Components/Admin/ProductTable/ProductTable";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Category from "../comman/SidebarCategory/Category/Category";
import UserAccount from "../Components/UserAccount/UserAccount";
import Cart from "../Components/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import ProductNew from "../Components/Admin/ProductNew/ProductNew";
import { getProducts } from "./Loaders/adminLoaders";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/product',
                element: <ProductDetails/>
            },
            {
                path: '/category',
                element: <Category/>
            },
            {
                element: <UserAuthRoute />,
                children: [
                    {
                        path: '/user-account',
                        element: <UserAccount/>
                    },
                    {
                        path: '/my-cart',
                        element: <Cart/>
                    },
                    {
                        path: '/checkout',
                        element: <Checkout/>
                    },
                    {
                        path: '/admin',
                        element: <RoleAuthRoute role='admin' />,
                        children: [
                            {
                                path: 'add-product',
                                element: <ProductNew/>
                            },
                            {
                                path: 'product-table',
                                element: <ProductTable/>,
                                loader: getProducts
                            }
                        ]
                    }
                ]
            },
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }

]);

export default router;