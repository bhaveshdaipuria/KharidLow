import { useEffect, useState } from 'react';
import './App.css'
import Home from './Components/Home/Home'
import Category from './Components/Category/Category'
import NewArrival from './Components/NewArrival/NewArrival'
import Header from './comman/Header'
import axios from 'axios';
import Registration from './components/Registration/Registration';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
      element: <Registration />,
    },
  ]);

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
      <Header></Header>
      <RouterProvider router={router} />
    </>
  )
}

export default App
