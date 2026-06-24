import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [mode, setMode]       = useState('login'); // 'login' | 'register'
  const [form, setForm]       = useState({ name: '', email: '', password: '' });
  const { setToken }          = useShop();
  const navigate              = useNavigate();

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    // Placeholder: replace with real API call to /api/user/login or /api/user/register
    const fakeToken = btoa(form.email + ':' + Date.now());
    setToken(fakeToken);
    toast.success(mode === 'login' ? 'Welcome back! 👋' : 'Account created! Welcome to Glam 🌹');
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-glam">
      <div className="w-full max-w-md bg-white shadow-xl p-8 rounded-sm">
        <div className="text-center mb-8">
          <span className="font-playfair text-3xl font-bold text-rose-600">Glam</span>
          <h2 className="text-gray-700 text-sm uppercase tracking-widest mt-2">
            {mode === 'login' ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-7">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-sm uppercase tracking-widest transition-colors ${
                mode === m ? 'border-b-2 border-rose-500 text-rose-600 font-semibold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <input
              name="name" value={form.name} onChange={handleChange} required
              placeholder="Full name" className="input-field"
            />
          )}
          <input
            name="email" type="email" value={form.email} onChange={handleChange} required
            placeholder="Email address" className="input-field"
          />
          <input
            name="password" type="password" value={form.password} onChange={handleChange} required
            placeholder="Password" minLength={6} className="input-field"
          />
          <button type="submit" className="btn-primary w-full mt-2">
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {mode === 'login' && (
          <p className="text-center text-xs text-rose-400 mt-4 cursor-pointer hover:underline">
            Forgot your password?
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
