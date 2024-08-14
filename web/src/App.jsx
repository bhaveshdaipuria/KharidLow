import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './Components/Home/Home'
import Header from './comman/Header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    {/* Header Comman component for all routes */}
     <Header>

     </Header>
     <Home>
      
     </Home>
    </>
  )
}

export default App
