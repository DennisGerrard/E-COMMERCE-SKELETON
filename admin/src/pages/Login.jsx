import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });
      if (response.data.success) {
        setToken(response.data.token);
        toast.success("Welcome, Admin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-rose-50/30">
      <div className="bg-white shadow-xl shadow-rose-100/40 rounded-xl px-10 py-12 max-w-sm w-full border border-gray-100">
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-4xl font-serif text-rose-800 tracking-wider font-bold text-center">GLAM</h1>
            <p className="text-[10px] mt-1 font-semibold text-center uppercase tracking-widest text-gold-500">Admin Dashboard</p>
        </div>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full px-4 py-2.5 border border-gray-300 outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400 rounded transition-all text-sm" type="email" placeholder="admin@glam.com" required />
          </div>
          <div className="mb-8">
            <p className="text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wide">Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full px-4 py-2.5 border border-gray-300 outline-none focus:ring-1 focus:ring-rose-400 focus:border-rose-400 rounded transition-all text-sm" type="password" placeholder="Enter password" required />
          </div>
          <button className="bg-gray-900 text-white w-full py-3 rounded hover:bg-rose-600 transition-colors font-medium tracking-wide uppercase text-sm">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
