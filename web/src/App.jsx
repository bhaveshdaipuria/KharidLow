import './App.css';
import Home from './Components/Home/Home';
import Layout from './Layout/Layout';
import Category from './Components/Category/Category';
import NewArrival from './Components/NewArrival/NewArrival';
import Header from './comman/Header';
import axios from 'axios';
import { Routes, Route } from "react-router-dom";
import Footer from './comman/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ProductNew from './Components/Admin/ProductNew/ProductNew';
import ProductTable from './Components/Admin/ProductTable/ProductTable';
// import ProductNew from './components/Admin/ProductNew/ProductNew';
import { Toaster } from 'react-hot-toast';


function App() {

  return (
    <>
      {/* Header Comman component for all routes */}

      <Routes>
        <Route path='/' element={<Layout />} >
          <Route path="" element={<Home />} />
          <Route path="product" element={<ProductDetails />} />
          <Route path="register" element={<Register />} />
          <Route path="category" element={<Category />} />
          <Route path="new-arrival" element={<NewArrival />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  )
}

export default App
