import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*  Wrapping chankra App in chakra provider so we can use it in our project*/}
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
