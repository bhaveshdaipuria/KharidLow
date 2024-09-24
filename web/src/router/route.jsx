import UserAuthRoute from "../utils/auth/UserAuth";
import Layout from "../Layout/Layout";
import RoleAuthRoute from "../utils/auth/RoleAuth";
import NotFound from "../Components/NotFound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../comman/Loader/Loader";

const LazyHome = lazy(() => import("../Components/Home/Home"));
const LazyRegister = lazy(() => import("../Components/Register/Register"));
const LazyLogin = lazy(() => import("../Components/Login/Login"));
const LazyProductDetail = lazy(() => import("../Components/ProductDetails/ProductDetails"));
const LazyCategory = lazy(() => import("../comman/SidebarCategory/Category/Category"));
const LazyUserAccount = lazy(() => import("../Components/UserAccount/UserAccount"));
const LazyCheckout = lazy(() => import("../Components/Checkout/Checkout"));
const LazyCart = lazy(() => import("../Components/Cart/Cart"));
const LazyProductNew = lazy(() => import("../Components/Admin/ProductNew/ProductNew"));
const LazyProductTable = lazy(() => import("../Components/Admin/ProductTable/ProductTable"));

function SuspenseWrapper({ element }) {
    return (
        <Suspense
            fallback={<Loader />}>
            {element}
        </Suspense>
    )
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <SuspenseWrapper element={<LazyHome/>}/>
            },
            {
                path: '/register',
                element: <SuspenseWrapper element={<LazyRegister/>}/>
            },
            {
                path: '/login',
                element: <SuspenseWrapper element={<LazyLogin/>}/>
            },
            {
                path: '/product',
                element: <SuspenseWrapper element={<LazyProductDetail/>}/>
            },
            {
                path: '/category',
                element: <SuspenseWrapper element={<LazyCategory/>}/>
            },
            {
                element: <UserAuthRoute />,
                children: [
                    {
                        path: '/user-account',
                        element: <SuspenseWrapper element={<LazyUserAccount/>}/>
                    },
                    {
                        path: '/my-cart',
                        element: <SuspenseWrapper element={<LazyCart/>}/>
                    },
                    {
                        path: '/checkout',
                        element: <SuspenseWrapper element={<LazyCheckout/>}/>
                    },
                    {
                        path: '/admin',
                        element: <RoleAuthRoute role='admin' />,
                        children: [
                            {
                                path: 'add-product',
                                element: <SuspenseWrapper element={<LazyProductNew/>}/>
                            },
                            {
                                path: 'product-table',
                                element: <SuspenseWrapper element={<LazyProductTable/>}/>
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