import React from 'react';

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-3 px-6 sm:px-10 justify-between border-b shadow-sm bg-white border-gray-100">
      <div className="flex flex-col items-start leading-none gap-0.5">
        <h1 className="text-3xl font-serif text-rose-800 tracking-wider">GLAM</h1>
        <p className="text-[10px] uppercase font-bold tracking-widest text-gold-500">Admin Panel</p>
      </div>
      <button 
        onClick={() => setToken('')} 
        className="bg-gray-800 text-white px-5 py-2 rounded-full text-xs font-semibold hover:bg-rose-600 transition-colors uppercase tracking-widest">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
