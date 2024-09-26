import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { RouterProvider } from 'react-router-dom'
import 'react-multi-carousel/lib/styles.css';
import router from './router/route.jsx';

createRoot(document.getElementById('root')).render(
  <>
    {/*  Wrapping chankra App in chakra provider so we can use it in our project*/}
    <ChakraProvider>
       {/*  Wrapping App in Route provider so we can use routing in our project*/}
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ChakraProvider>
  </>,
)
