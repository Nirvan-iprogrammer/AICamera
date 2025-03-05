import { useState } from 'react'
import SideNavBar from './Components/SideNavBar'
import { ServiceCam } from './Components/Services'
import Settings from './Components/Settings'
import Events from './Components/Events'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Link } from "react-router-dom";
import LiveCam from './Components/LiveCam'


function App() {
  const [count, setCount] = useState(0)

  const AppLayout = () => {
    return (
      
      <>
        <SideNavBar />
        <div className="ml-[20px] p-[20px] h-full">
          <Outlet />
        </div>
      </>
    )
  }

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <LiveCam />
        },
        {
          path: "/services",
          element: <ServiceCam />
        },
        {
          path: "/event",
          element: <Events />
        },
        {
          path: "/setting",
          element: <Settings />,
        }
      ]

    }
  ])

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
