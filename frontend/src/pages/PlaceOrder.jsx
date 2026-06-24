import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const { setCartItems, getCartAmount, delivery_fee } = useShop();
  const navigate = useNavigate();
  const [method, setMethod] = useState('cod');
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    street: '', city: '', state: '', zipcode: '', country: '', phone: '',
  });

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    if (getCartAmount() === 0) { toast.error('Your cart is empty'); return; }
    // In full backend integration, post to /api/order/place here
    toast.success('Order placed successfully! 🎉');
    setCartItems({});
    navigate('/orders');
  };

  const inputClass = 'input-field';

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Title text1="Place" text2="Order" />

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Delivery Info */}
        <div className="flex-1">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-5 font-semibold">Delivery Information</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="First name" className={inputClass} />
            <input name="lastName"  value={form.lastName}  onChange={handleChange} required placeholder="Last name"  className={inputClass} />
          </div>
          <input name="email"   value={form.email}   onChange={handleChange} required type="email" placeholder="Email address" className={`${inputClass} mb-4`} />
          <input name="street"  value={form.street}  onChange={handleChange} required placeholder="Street address" className={`${inputClass} mb-4`} />
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="city"  value={form.city}  onChange={handleChange} required placeholder="City"    className={inputClass} />
            <input name="state" value={form.state} onChange={handleChange} required placeholder="State"   className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input name="zipcode" value={form.zipcode} onChange={handleChange} required placeholder="ZIP code" className={inputClass} />
            <input name="country" value={form.country} onChange={handleChange} required placeholder="Country"  className={inputClass} />
          </div>
          <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="Phone number" className={inputClass} />
        </div>

        {/* Summary + Payment */}
        <div className="w-full lg:w-80">
          <CartTotal />

          <div className="mt-8">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold">Payment Method</p>
            {[
              { id: 'mpesa', label: 'M-Pesa Buy Goods', icon: '📱' },
              { id: 'cod', label: 'Cash on Delivery', icon: '💵' },
            ].map(({ id, label, icon }) => (
              <label key={id} className={`flex items-center gap-3 p-3 border mb-2 cursor-pointer transition-all ${method === id ? 'border-rose-500 bg-rose-50' : 'border-gray-200 hover:border-gray-300'}`}>
                <input type="radio" name="method" value={id} checked={method === id} onChange={() => setMethod(id)} className="accent-rose-500" />
                <span className="text-lg">{icon}</span>
                <span className="text-sm text-gray-700 font-medium">{label}</span>
              </label>
            ))}

            {method === 'mpesa' && (
              <div className="mt-4 p-4 border border-green-200 bg-green-50 rounded-sm">
                <p className="text-sm font-semibold text-green-800 mb-2">M-Pesa Payment Instructions</p>
                <div className="text-sm text-green-700 space-y-1">
                  <p>1. Open M-Pesa on your phone</p>
                  <p>2. Select <strong>Buy Goods and Services</strong></p>
                  <p>3. Enter Till Number: <strong>123456</strong> (Glam Store)</p>
                  <p>4. Enter Amount: <strong>{getCartAmount() > 0 ? getCartAmount() + delivery_fee : 0}</strong></p>
                  <p>5. Enter PIN and send</p>
                </div>
                <div className="mt-3 relative">
                  <input
                    name="mpesaRef"
                    value={form.mpesaRef || ''}
                    onChange={handleChange}
                    type="text"
                    required
                    placeholder="M-Pesa Trans. ID (e.g. QFE...)"
                    className="w-full border border-green-300 px-3 py-2 text-sm outline-none focus:border-green-500 bg-white"
                  />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary w-full mt-6">
            Confirm Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
