import UserAuthRoute from "../utils/auth/UserAuth";
import Category from "../comman/SidebarCategory/Category/Category";
import Cart from "../Components/Cart/Cart";
import Checkout from "../Components/Checkout/Checkout";
import Home from "../Components/Home/Home";
import Login from "../Components/Login/Login";
import ProductDetails from "../Components/ProductDetails/ProductDetails";
import Register from "../Components/Register/Register";
import UserAccount from "../Components/UserAccount/UserAccount";
import Layout from "../Layout/Layout";
import { createBrowserRouter } from "react-router-dom";
import RoleAuthRoute from "../utils/auth/RoleAuth";
import ProductNew from "../Components/Admin/ProductNew/ProductNew";
import ProductTable from "../Components/Admin/ProductTable/ProductTable";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/product',
                element: <ProductDetails />
            },
            {
                path: '/category',
                element: <Category />
            },
            {
                element: <UserAuthRoute />,
                children: [
                    {
                        path: '/user-account',
                        element: <UserAccount />
                    },
                    {
                        path: '/my-cart',
                        element: <Cart />
                    },
                    {
                        path: '/checkout',
                        element: <Checkout />
                    },
                    {
                        path: '/admin',
                        element: <RoleAuthRoute role='admin' />,
                        children: [
                            {
                                path: 'add-product',
                                element: <ProductNew />
                            },
                            {
                                path: 'product-table',
                                element: <ProductTable />
                            }
                        ]
                    }
                ]
            },
        ]
    },

]);