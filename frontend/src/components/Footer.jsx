import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-300 pt-14 pb-8 mt-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
      {/* Brand */}
      <div className="md:col-span-1">
        <div className="flex items-center gap-1 mb-4">
          <span className="font-playfair text-2xl font-bold text-rose-400 tracking-wide">Glam</span>
          <span className="w-2 h-2 rounded-full bg-rose-400 mb-1" />
        </div>
        <p className="text-sm leading-relaxed text-neutral-400">
          Curated fashion for every occasion. Discover the latest styles with the quality you deserve.
        </p>
      </div>

      {/* Company */}
      <div>
        <h4 className="text-white font-semibold uppercase text-xs tracking-widest mb-4">Company</h4>
        <ul className="space-y-2 text-sm">
          {['/', '/about', '/collection', '/contact'].map((path, i) => (
            <li key={path}>
              <Link to={path} className="hover:text-rose-400 transition-colors">
                {['Home', 'About Us', 'Shop', 'Contact'][i]}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Customer */}
      <div>
        <h4 className="text-white font-semibold uppercase text-xs tracking-widest mb-4">Customer</h4>
        <ul className="space-y-2 text-sm">
          {['Track Order', 'Returns & Exchange', 'Size Guide', 'FAQ'].map(item => (
            <li key={item}><span className="cursor-pointer hover:text-rose-400 transition-colors">{item}</span></li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="text-white font-semibold uppercase text-xs tracking-widest mb-4">Get In Touch</h4>
        <ul className="space-y-2 text-sm text-neutral-400">
          <li>hello@glamstore.com</li>
          <li>+1 (800) 456-GLAM</li>
          <li className="flex gap-3 pt-2">
            {['Instagram', 'Pinterest', 'TikTok'].map(s => (
              <span key={s} className="cursor-pointer hover:text-rose-400 transition-colors text-xs uppercase tracking-wider">{s}</span>
            ))}
          </li>
        </ul>
      </div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 pt-6 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-neutral-500">
      <p>© {new Date().getFullYear()} Glam. All rights reserved.</p>
      <p>Privacy Policy · Terms of Use</p>
    </div>
  </footer>
);

export default Footer;
