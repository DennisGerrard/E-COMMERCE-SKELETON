import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-[80px] md:w-[220px] lg:w-[250px] min-h-screen border-r border-gray-200 bg-white shadow-sm flex flex-col pt-8 text-sm">
      <div className="flex flex-col gap-3 px-4">
        <NavLink 
          className={({isActive}) => `flex items-center gap-3 border border-gray-200 px-4 py-3 rounded-md transition-all ${isActive ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} 
          to="/add">
          <span className="text-xl">➕</span>
          <p className="hidden md:block uppercase tracking-wider text-xs">Add Product</p>
        </NavLink>
        <NavLink 
          className={({isActive}) => `flex items-center gap-3 border border-gray-200 px-4 py-3 rounded-md transition-all ${isActive ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} 
          to="/list">
          <span className="text-xl">📋</span>
          <p className="hidden md:block uppercase tracking-wider text-xs">List Products</p>
        </NavLink>
        <NavLink 
          className={({isActive}) => `flex items-center gap-3 border border-gray-200 px-4 py-3 rounded-md transition-all ${isActive ? 'bg-rose-50 border-rose-300 text-rose-700 font-semibold shadow-inner' : 'text-gray-600 hover:bg-gray-50'}`} 
          to="/orders">
          <span className="text-xl">📦</span>
          <p className="hidden md:block uppercase tracking-wider text-xs">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
