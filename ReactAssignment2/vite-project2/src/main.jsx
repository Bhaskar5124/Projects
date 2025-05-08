import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.jsx'
import Bookbrowse from './components/Bookbrowse.jsx'
import Addbook from './components/Addbook.jsx'
import Bookdetails from './components/Bookdetails.jsx'
import Error from './components/Error.jsx'


const LibraryRouter = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children:[
      {
        path:"/",
        element:<Home/>,
      },
      {
        path:"/bookbrowse",
        element:<Bookbrowse/>,
      },
      {
        path:"/addbook",
        element:<Addbook/>,
      },
      {
        path:"/book/:id",
        element:<Bookdetails/>,
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
<RouterProvider router={LibraryRouter}></RouterProvider>
)

