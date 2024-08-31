import { useEffect, useState } from 'react';
import './App.css'
import Home from './Components/Home/Home'
import Header from './comman/Header'
import axios from 'axios';
import Registration from './components/Registration/Registration';

function App() {
  const [data, setData] = useState("");

  const getData = async () => {
    const response = await axios.get("http://localhost:3000/getData");
    setData(response.data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {/* Header Comman component for all routes */}
      <Header></Header>
      <Home></Home>
      {/* <Registration></Registration> */}
    </>
  )
}

export default App
