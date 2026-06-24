import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import CartTotal from '../components/CartTotal';
import Title from '../components/Title';

const Cart = () => {
  const { cartItems, products, currency, updateQuantity } = useShop();
  const navigate = useNavigate();

  const cartData = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      const product = products.find(p => p._id === itemId);
      if (product) cartData.push({ ...product, size, quantity: cartItems[itemId][size] });
    }
  }

  if (cartData.length === 0) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-400">
      <svg className="w-14 h-14" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1={3} y1={6} x2={21} y2={6}/>
        <path d="M16 10a4 4 0 01-8 0"/>
      </svg>
      <p className="text-lg">Your cart is empty</p>
      <Link to="/collection" className="btn-primary text-sm">Continue Shopping</Link>
    </div>
  );

  const handleWhatsAppOrder = () => {
    let message = "Hi! I'd like to place an order from my cart:\n\n";
    cartData.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (${item.size}) - ${currency}${item.price * item.quantity}\n`;
    });
    
    // Calculate total from CartTotal logic
    const subtotal = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal === 0 ? 0 : 10;
    const total = subtotal + shipping;
    
    message += `\nSubtotal: ${currency}${subtotal}`;
    message += `\nShipping: ${currency}${shipping}`;
    message += `\n*Total: ${currency}${total}*\n`;
    
    // Replace with actual business WhatsApp number
    const ownerNumber = "254700000000"; 
    window.open(`https://wa.me/${ownerNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Title text1="Your" text2="Cart" />

      <div className="space-y-4 mb-10">
        {cartData.map(({ _id, image, name, price, size, quantity }) => (
          <div key={`${_id}-${size}`} className="flex items-center gap-4 border-b border-gray-100 pb-4">
            <img
              src={Array.isArray(image) ? image[0] : image}
              alt={name}
              className="w-20 h-24 object-cover object-top bg-gray-50"
              onError={e => { e.target.src = 'https://placehold.co/80x96?text=G'; }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">{name}</p>
              <p className="text-xs text-gray-500 mt-0.5">Size: {size}</p>
              <p className="text-sm font-semibold text-rose-600 mt-1">{currency}{price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(_id, size, quantity - 1)}
                className="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-700 hover:border-rose-400"
              >−</button>
              <span className="w-6 text-center text-sm">{quantity}</span>
              <button
                onClick={() => updateQuantity(_id, size, quantity + 1)}
                className="w-7 h-7 border border-gray-300 flex items-center justify-center text-gray-700 hover:border-rose-400"
              >+</button>
            </div>
            <button
              onClick={() => updateQuantity(_id, size, 0)}
              className="text-gray-400 hover:text-rose-500 ml-2"
              aria-label="Remove"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-6 items-start">
        <div className="w-full sm:w-80">
          <CartTotal />
          <button
            onClick={() => navigate('/place-order')}
            className="btn-primary w-full mt-4"
          >
            Proceed to Checkout
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="w-full mt-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-3 text-sm tracking-widest uppercase transition-colors"
          >
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
