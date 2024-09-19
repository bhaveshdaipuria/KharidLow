import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BrowserRouter } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css';

createRoot(document.getElementById('root')).render(
  <>
    {/*  Wrapping chankra App in chakra provider so we can use it in our project*/}
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </>,
)
