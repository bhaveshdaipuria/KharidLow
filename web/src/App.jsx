import { useEffect, useState } from 'react';
import './App.css'
import Home from './Components/Home/Home'
import Category from './Components/Category/Category'
import NewArrival from './Components/NewArrival/NewArrival'
import Header from './comman/Header'
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './comman/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
<<<<<<< HEAD
import Register from './Components/Register/Register';
=======
import Registration from './Components/Registration/Registration';
import ProductScroll from './comman/ProductScroll/ProductScroll';
>>>>>>> 1447601a1a8c15a99a9938613e99fc5b61bc0be5

function App() {
  // const [data, setData] = useState("");

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/category",
      element: <Category />,
    },
    {
      path: "/new-arrival",
      element: <NewArrival />,
    },
    {
      path: "/registration",
      element: <Register />,
    },
  ]);

  // const getData = async () => {
  //   const response = await axios.get("http://localhost:3000/getData");
  //   setData(response.data);
  // }

  // const getData = async () => {
  //   const response = await axios.get("http://localhost:3000/getData");
  //   setData(response.data);
  // }

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      {/* Header Comman component for all routes */}
      {/* <RouterProvider router={router} /> */}
      <Header></Header>
  
      {/* <ProductDetails></ProductDetails> */}
      
      <Register></Register>
      {/* <Home>

      </Home> */}

      <Footer></Footer>
    </>
  )
}

export default App
