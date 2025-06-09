import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Body from './components/Body.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Videodetail from './components/Videodetail.jsx'
import Header from './components/Header.jsx'
import Headerbody from './components/Headerbody.jsx'

const ytrouter = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    //errorElement: <Error/>,
    children:[
      {
        path:"/",
        element:<Header />,
      },
      {
        path:"/video/:id",
        element:<Headerbody/>,
      },
    ]

  },
])

createRoot(document.getElementById('root')).render(
 <RouterProvider router={ytrouter}></RouterProvider>
 )
