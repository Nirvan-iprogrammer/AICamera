import React from 'react'
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";


const Header = () => {
    return (
      <div className="flex justify-end p-4 bg-white text-black ">
        <Link to="/setting" className="hover:underline">
          <FiSettings size={32} />
        </Link>
      </div>
    );
  };

export default Header;