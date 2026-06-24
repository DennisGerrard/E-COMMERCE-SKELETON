import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { products as defaultProducts, currency, delivery_fee, backendUrl } from '../assets/assets';

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [search, setSearch]         = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems]   = useState({});
  const [products]                  = useState(defaultProducts);
  const [token, setToken]           = useState(localStorage.getItem('glamToken') || '');

  // ── Cart helpers ─────────────────────────────────────────────────────────────
  const addToCart = (itemId, size) => {
    if (!size) { toast.error('Please select a size'); return; }
    setCartItems(prev => {
      const copy = structuredClone(prev);
      if (!copy[itemId]) copy[itemId] = {};
      copy[itemId][size] = (copy[itemId][size] || 0) + 1;
      return copy;
    });
    toast.success('Added to cart');
  };

  const updateQuantity = (itemId, size, quantity) => {
    setCartItems(prev => {
      const copy = structuredClone(prev);
      if (quantity === 0) { delete copy[itemId]?.[size]; }
      else { copy[itemId][size] = quantity; }
      return copy;
    });
  };

  const getCartCount = () =>
    Object.values(cartItems).reduce(
      (total, sizes) => total + Object.values(sizes).reduce((a, b) => a + b, 0), 0
    );

  const getCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      const product = products.find(p => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        total += product.price * cartItems[itemId][size];
      }
    }
    return total;
  };

  // ── Token persistence ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (token) localStorage.setItem('glamToken', token);
    else localStorage.removeItem('glamToken');
  }, [token]);

  const value = {
    products, currency, delivery_fee, backendUrl,
    search, setSearch, showSearch, setShowSearch,
    cartItems, setCartItems,
    addToCart, updateQuantity,
    getCartCount, getCartAmount,
    token, setToken,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export const useShop = () => useContext(ShopContext);
export default ShopContextProvider;
