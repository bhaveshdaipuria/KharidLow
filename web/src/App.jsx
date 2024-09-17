import './App.css';
import Home from './Components/Home/Home';
import Category from './Components/Category/Category';
import NewArrival from './Components/NewArrival/NewArrival';
import Header from './comman/Header';
import axios from 'axios';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Footer from './comman/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import ProductNew from './Components/Admin/ProductNew/ProductNew';
import ProductTable from './Components/Admin/ProductTable/ProductTable';
import Cart from './Components/Cart/Cart';
// import ProductNew from './components/Admin/ProductNew/ProductNew';

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
      
      {/* <Register></Register> */}
      {/* <Login></Login> */}
      {/* <Home></Home> */}
      {/* <ProductNew></ProductNew> */}
      <Cart></Cart>
      {/* <ProductTable></ProductTable> */}

      <Footer></Footer>
    </>
  )
}

export default App
