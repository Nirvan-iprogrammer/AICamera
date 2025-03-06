// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaStar, FaCamera } from 'react-icons/fa';
// import { MdDesignServices } from 'react-icons/md';
// import { FiSettings } from 'react-icons/fi';
// import { MdEventSeat } from 'react-icons/md';
// import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
// import data from "../assets/dummyData.json"

// const SideNavBar = () => {
//   const navigate = useNavigate();
//   const [isServiceOpen, setIsServiceOpen] = useState(false);

//   const handleNavigate = (path) => {
//     navigate(path);
//     setIsServiceOpen(false);
//   };

//   return (
//     <div className="fixed top-0 left-0 w-[200px] h-full bg-gray-800 text-white pt-[100px]">
//       <ul className="list-none p-0">
//         <li className="my-6">
//           <Link to="/" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
//             <FaCamera />
//             <span>LiveCam</span>
//           </Link>
//         </li>

//         <li className="my-6">
//           <div
//             className="flex items-center justify-between text-white no-underline text-lg hover:text-gray-400 cursor-pointer"
//             onClick={() => setIsServiceOpen(!isServiceOpen)}
//           >
//             <div className="flex items-center space-x-3">
//               <MdDesignServices />
//               <span>Services</span>
//             </div>
//             {isServiceOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
//           </div>

//           {isServiceOpen && (
//             <ul className="ml-1 mt-2 space-y-2 mx-2">
//               <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/attendence')}>Attendance System </li>
//               <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/fireEvent')}>Fire Detection </li>
//               <li className="hover:text-gray-400 cursor-pointer" onClick={() => handleNavigate('/services/intrusion')}>Intrusion Detection </li>
//             </ul>
//           )}
//         </li>

//         <li className="my-6">
//           <Link to="/event" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
//             <MdEventSeat />
//             <span>Events</span>
//           </Link>
//         </li>

//         <li className="my-6">
//           <Link to="/setting" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
//             <FiSettings />
//             <span>Settings</span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default SideNavBar;

import React from 'react'
import { FaStar } from "react-icons/fa";
import { FaCamera } from "react-icons/fa";
import {Link} from "react-router-dom";
import { MdDesignServices } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { MdEventSeat } from "react-icons/md";


const SideNavBar = () => {
  return (
<div className="fixed top-0 left-0 w-[200px] h-full bg-gray-800 text-white pt-[100px]">
  <ul className="list-none p-0">
    <li className="my-6">
      <Link to="/" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
        <FaCamera />
        <span>LiveCam</span>
      </Link>
    </li>
    <li className="my-6">
      <Link to="/services" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
        <MdDesignServices />
        <span>Services</span>
      </Link>
    </li>
    <li className="my-6">
      <Link to="/event" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
        <MdEventSeat />
        <span>Events</span>
      </Link>
    </li>
    <li className="my-6">
      <Link to="/analytic" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
        <FiSettings />
        <span>Analytics</span>
      </Link>
    </li>
    <li className="my-6">
      <Link to="/setting" className="flex items-center space-x-3 text-white no-underline text-lg hover:text-gray-400">
        <FiSettings />
        <span>Settings</span>
      </Link>
    </li>
  </ul>
</div>

  )
}

export default SideNavBar