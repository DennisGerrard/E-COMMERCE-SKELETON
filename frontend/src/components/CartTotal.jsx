import React from 'react';
import { useShop } from '../context/ShopContext';

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useShop();
  const subtotal = getCartAmount();
  const shipping = subtotal === 0 ? 0 : delivery_fee;
  const total    = subtotal + shipping;

  return (
    <div className="border border-gray-200 p-6 bg-gray-50">
      <h3 className="font-semibold text-gray-800 mb-4 text-sm uppercase tracking-widest">Order Summary</h3>
      <div className="space-y-3 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{currency}{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `${currency}${shipping}`}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-gray-800">
          <span>Total</span>
          <span>{currency}{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
