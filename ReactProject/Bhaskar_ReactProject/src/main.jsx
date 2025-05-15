import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './components/Body.jsx'

const Productdetails = lazy(()=>import('./components/Productdetails.jsx'));
const Cart = lazy(()=>import('./components/Cart.jsx'));
const Error = lazy(()=>import('./components/Error.jsx'));

const Shoppyrouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement: <Error/>,
    children:[
      {
        path:"/",
        element:<Body/>,
      },
      {
        path:"/cart",
        element:<Suspense fallback={<div className='h-200 w-full flex justify-center items-center max-sm:h-full'><div className='text-4xl font-semibold max-sm:text-2xl'>Loading Cart...</div></div>}>
          <Cart/>
          </Suspense>,
      },
      {
        path:"/product/:id",
        element:<Suspense fallback={<div className='h-200 w-full flex justify-center items-center max-sm:h-full'><div className='text-4xl font-semibold max-sm:text-2xl'>Loading Product...</div></div>}>
          <Productdetails/>
        </Suspense>,
      },
    ]

  },
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={Shoppyrouter}></RouterProvider>
 )
