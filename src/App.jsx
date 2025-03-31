import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideNavBar from './Components/SideNavBar';
import { ServiceCam } from './Pages/Services';
import Settings from './Pages/Settings';
import Events from './Pages/Events';
import LiveCam from './Components/LiveCam';
import Attendance from './Pages/Attendance';
import FireEvent from './Pages/FireEvent';
import Intrusion from './Pages/Intrusion';
import Analytics from './Pages/Analytics';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/header';
import axios from 'axios';
import ProtectedRoute from './Components/protectedRoute';


function ProtectedLayout({ Component }) {
  return (
    <ProtectedRoute>
      <div className='flex h-full'>
        <SideNavBar />
        <div className='ml-[20px] p-[20px] w-full'>
          <Header />
          <Component />
        </div>
      </div>
    </ProtectedRoute>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<ProtectedLayout Component={LiveCam} />} />
        <Route path='/services' element={<ProtectedLayout Component={ServiceCam} />} />
        <Route path='/services/attendence' element={<ProtectedLayout Component={Attendance} />} />
        <Route path='/services/fireEvent' element={<ProtectedLayout Component={FireEvent} />} />
        <Route path='/services/intrusion' element={<ProtectedLayout Component={Intrusion} />} />
        <Route path='/event' element={<ProtectedLayout Component={Events} />} />
        <Route path='/setting' element={<ProtectedLayout Component={Settings} />} />
        <Route path='/services/analytic' element={<ProtectedLayout Component={Analytics} />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
}

export default App;