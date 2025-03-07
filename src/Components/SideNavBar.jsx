import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCamera, FaFire, FaToriiGate, FaBars, FaBox, FaUsers, FaFileInvoice, FaEnvelope, FaBriefcase, FaChartPie, FaFileAlt, FaLock, FaBook, FaToolbox } from 'react-icons/fa';
import { logo } from '../assets/images';
import { FaPeopleRoof } from "react-icons/fa6";


const img_url = "data:image/jpeg;base64,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"
const logo_url = "data:image/jpeg;base64,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"
// import { FaCamera, FaFire, FaToriiGate, FaPeopleRoof, FaBars } from 'react-icons/fa';

const SideNavBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("LiveCam");

  console.log("active", activeTab)

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
        {!isCollapsed && <img src={logo_url} class="h-[30px] w-[30px]" alt="logo" />}
      </div>

      <ul className="list-none px-4 space-y-4">


        <li
          onClick={() => setActiveTab("LiveCam")}
        >
          <Link
            to="/"
            className={`flex items-center space-x-4 text-white no-underline text-lg p-3 cursor-pointer transition-all duration-300 ${activeTab === "LiveCam" ? "text-blue-400 border-l-4 border-white bg-gray-900" : "hover:text-gray-400"
              }`}
          >
            <FaCamera />
            {!isCollapsed && <span>LiveCam</span>}
          </Link>
        </li>

        <li
          onClick={() => setActiveTab("fire")}
        >
          <Link
            to="/services/fireEvent"
            className={`flex items-center space-x-4 text-white no-underline text-lg p-3 cursor-pointer transition-all duration-300 ${activeTab === "fire" ? "text-blue-400 border-l-4 border-white bg-gray-900" : "hover:text-gray-400"
              }`}
          >
            <FaFire />
            {!isCollapsed && <span>Fire Event</span>}
          </Link>
        </li>

        <li
          onClick={() => setActiveTab("intrusion")}>

          <Link
            to="/services/intrusion"
            className={`flex items-center space-x-4 text-white no-underline text-lg p-3 cursor-pointer transition-all duration-300 ${activeTab === "intrusion" ? "text-blue-400 border-l-4 border-white bg-gray-900" : "hover:text-gray-400"
              }`}
          >
            <FaToriiGate />
            {!isCollapsed && <span>Intrusion</span>}
          </Link>
        </li>

        <li
          onClick={() => setActiveTab("crowd")}
        >
          <Link
            to="/services/attendence"
            className={`flex items-center space-x-4 text-white no-underline text-lg p-3 cursor-pointer transition-all duration-300 ${activeTab === "crowd" ? "text-blue-400 border-l-4 border-white bg-gray-900" : "hover:text-gray-400"
              }`}
          >
            <FaPeopleRoof />
            {!isCollapsed && <span>Crowd</span>}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideNavBar;

