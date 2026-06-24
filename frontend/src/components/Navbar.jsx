import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { assets } from '../assets/assets';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCartCount, setShowSearch, token, setToken, setCartItems } = useShop();
  const navigate = useNavigate();

  const logout = () => {
    setToken('');
    setCartItems({});
    navigate('/login');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/collection', label: 'Collection' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-rose-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-1">
          <span className="font-playfair text-2xl font-bold text-rose-600 tracking-wide">Glam</span>
          <span className="w-2 h-2 rounded-full bg-rose-400 mb-1" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm tracking-wider uppercase transition-colors ${
                  isActive ? 'text-rose-600 font-semibold' : 'text-gray-600 hover:text-rose-500'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-5">
          {/* Search */}
          <button onClick={() => setShowSearch(v => !v)} className="text-gray-600 hover:text-rose-500 transition-colors" aria-label="Search">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          {/* Cart */}
          <Link to="/cart" className="relative text-gray-600 hover:text-rose-500 transition-colors" aria-label="Cart">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1={3} y1={6} x2={21} y2={6}/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Profile dropdown */}
          <div className="relative group">
            <button className="text-gray-600 hover:text-rose-500 transition-colors" aria-label="Profile">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx={12} cy={7} r={4}/>
              </svg>
            </button>
            <div className="absolute right-0 top-8 w-40 bg-white border border-gray-100 shadow-lg rounded hidden group-hover:block z-50">
              {token ? (
                <>
                  <Link to="/orders" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50">My Orders</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50">Logout</button>
                </>
              ) : (
                <Link to="/login" className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50">Login / Register</Link>
              )}
            </div>
          </div>

          {/* Hamburger (mobile) */}
          <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {menuOpen
                ? <path d="M6 18L18 6M6 6l12 12"/>
                : <path d="M4 6h16M4 12h16M4 18h16"/>
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-rose-100 px-4 pb-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-sm text-gray-700 border-b border-gray-100 uppercase tracking-wider"
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
