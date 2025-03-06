import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaFire, FaToriiGate, FaBars, FaBox, FaUsers, FaFileInvoice, FaEnvelope, FaBriefcase, FaChartPie, FaFileAlt, FaLock, FaBook, FaToolbox } from 'react-icons/fa';
import { logo } from '../assets/images';
import { FaPeopleRoof } from "react-icons/fa6";

const img_url = "data:image/jpeg;base64,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"

// import { FaCamera, FaFire, FaToriiGate, FaPeopleRoof, FaBars } from 'react-icons/fa';

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
  <div className={`relative items-center top-0 left-0 ${isCollapsed ? 'w-[80px]' : 'w-[200px]'} h-full bg-gray-800 text-white transition-all duration-300 shadow-lg`}>         
      <button
        onClick={toggleSidebar}
        className="absolute top-4 right-4 text-white text-2xl focus:outline-none"
      >
        <FaBars />
      </button>

      <div className="p-5">
      {!isCollapsed &&  <img src={img_url} class="h-[30px] w-[30px]"  alt="logo" />}
      </div>

      <ul className="list-none px-4 space-y-4">
        

        <li>
          <Link to="/" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400 p-3">
            <FaCamera />
            {!isCollapsed && <span>LiveCam</span>}
          </Link>
        </li>

        <li>
          <Link to="/services/fireEvent" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400 p-3">
            <FaFire />
            {!isCollapsed && <span>Fire Event</span>}
          </Link>
        </li>

        <li>
          <Link to="/services/intrusion" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400 p-3">
            <FaToriiGate />
            {!isCollapsed && <span>Intrusion</span>}
          </Link>
        </li>

        <li>
          <Link to="/services/attendence" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400 p-3">
            <FaPeopleRoof />
            {!isCollapsed && <span>Crowd</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;

// import React from 'react'
// import { FaStar } from "react-icons/fa";
// import { FaCamera } from "react-icons/fa";
// import {Link} from "react-router-dom";
// import { MdDesignServices } from "react-icons/md";
// import { FiSettings } from "react-icons/fi";
// import { MdEventSeat } from "react-icons/md";


// const SideNavBar = () => {
//   return (
// <div className="fixed top-0 left-0 w-[200px] h-full bg-gray-800 text-white pt-[100px]">
//   <ul className="list-none p-0">
//     <li className="my-6">
//       <Link to="/" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400">
//         <FaCamera />
//         <span>LiveCam</span>
//       </Link>
//     </li>
//     <li className="my-6">
//       <Link to="/services" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400">
//         <MdDesignServices />
//         <span>Services</span>
//       </Link>
//     </li>
//     <li className="my-6">
//       <Link to="/event" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400">
//         <MdEventSeat />
//         <span>Events</span>
//       </Link>
//     </li>
//     <li className="my-6">
//       <Link to="/analytic" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400">
//         <FiSettings />
//         <span>Analytics</span>
//       </Link>
//     </li>
//     <li className="my-6">
//       <Link to="/setting" className="flex items-center space-x-4 text-white no-underline text-lg hover:text-gray-400">
//         <FiSettings />
//         <span>Settings</span>
//       </Link>
//     </li>
//   </ul>
// </div>

//   )
// }

// export default SideNavBar

{/* <li className="my-6">
<div
  className="flex items-center justify-between text-white no-underline text-lg hover:text-gray-400 cursor-pointer"
  onClick={() => setIsServiceOpen(!isServiceOpen)}
>
  <div className="flex items-center space-x-4">
    <MdDesignServices />
    <span>Services</span>
  </div>
  {isServiceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
</div>

{isServiceOpen && (
  <ul className="ml-1 mt-2 space-y-2 mx-2">
    <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/attendence')}>Attendance System </li>
    <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/fireEvent')}>Fire Detection </li>
    <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/intrusion')}>Intrusion Detection </li>
  </ul>
)}
</li> */}