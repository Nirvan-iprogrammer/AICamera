import { useState } from 'react'
import SideNavBar from './Components/SideNavBar'
import { ServiceCam } from './Components/Services'
import Settings from './Components/Settings'
import Events from './Components/Events'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Link } from "react-router-dom";
import LiveCam from './Components/LiveCam'
import  Attendance  from './Components/Attendance'
import FireEvent from './Components/FireEvent'
import Intrusion from './Components/Intrusion'
import Analytics from './Components/Analytics'
import { FiSettings } from "react-icons/fi";
import Header from './Components/header'



function App() {

  const AppLayout = () => {
    return (
      <>
       
        <div className="flex h-full">
          <SideNavBar />
          <div className="ml-[20px] p-[20px] w-full">
          <Header />
            <Outlet />
          </div>
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
          path: "/services/attendence",
          element: <Attendance />
        },
        {
          path: "/services/fireEvent",
          element: <FireEvent />
        },
        {
          path: "/services/intrusion",
          element: <Intrusion />
        },
        {
          path: "/event",
          element: <Events />
        },
        {
          path: "/setting",
          element: <Settings />,
        }, {
          path: "/services/analytic",
          element: <Analytics />
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
