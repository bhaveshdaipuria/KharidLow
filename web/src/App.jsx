import { useEffect, useState } from 'react';
import './App.css'
import Home from './Components/Home/Home'
import Header from './comman/Header'
import axios from 'axios';
import Footer from './comman/Footer/Footer';
import ProductDetails from './Components/ProductDetails/ProductDetails';

function App() {
  // const [data, setData] = useState("");

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
      <Header>

      </Header>
      
      <ProductDetails></ProductDetails>
      
      {/* <Home>

      </Home> */}

      <Footer>
        
      </Footer>
    </>
  )
}

export default App
