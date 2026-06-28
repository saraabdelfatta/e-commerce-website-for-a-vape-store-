import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = ({ collapsed = false, className = '' }) => {
  if (collapsed) {
    return (
      <Link to="/admin/dashboard" className={`inline-flex items-center font-bold tracking-wider text-xl ${className}`}>
        <span className="text-[#0F4C81] dark:text-white">V</span>
        <span className="text-[#00bfff]">C</span>
      </Link>
    );
  }

  return (
    <Link to="/admin/dashboard" className={`inline-flex items-center font-extrabold tracking-wider text-2xl ${className}`}>
      <span className="text-[#0F4C81] dark:text-white">VAPE</span>
      <span className="text-[#00bfff] ml-0.5">CAIRO</span>
    </Link>
  );
};

export default Logo;
