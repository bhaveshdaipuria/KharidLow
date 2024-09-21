import './App.css';
import Home from './Components/Home/Home';
import Layout from './Layout/Layout';
import Category from './Components/Category/Category';
import NewArrival from './Components/NewArrival/NewArrival';
import { Routes, Route } from "react-router-dom";
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ProductNew from './Components/Admin/ProductNew/ProductNew';
import ProductTable from './Components/Admin/ProductTable/ProductTable';
import Cart from './Components/Cart/Cart';
import { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import UserAuthRoute from './utils/auth/UserAuth';
import RoleAuthRoute from './utils/auth/RoleAuth';


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="product" element={<ProductDetails />} />
          <Route path="register" element={<Register />} />
          <Route path="category" element={<Category />} />
          <Route path="new-arrival" element={<NewArrival />} />
          <Route path="login" element={<Login />} />

          {/* Only logged In user can access these routes */}
          <Route element={<UserAuthRoute />}>
            <Route path="checkout" element={<Checkout />} />
            <Route path="my-cart" element={<Cart />} />

            {/* Only admin can access these routes */}
            <Route path='admin/' element={<RoleAuthRoute role='admin' />}>
              <Route path="add-product" element={<ProductNew />} />
              <Route path="product-table" element={<ProductTable />} />
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
