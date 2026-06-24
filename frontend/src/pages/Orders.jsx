import React from 'react';
import Title from '../components/Title';

// In a real app this would fetch from /api/order/userorders
const MOCK_ORDERS = [
  {
    id: 'ORD-2025-001',
    date: 'Jun 05, 2025',
    status: 'Delivered',
    items: [{ name: 'Floral Chiffon Blouse', size: 'M', qty: 1, price: 89 }],
    total: 99,
  },
  {
    id: 'ORD-2025-002',
    date: 'Jun 07, 2025',
    status: 'Out for Delivery',
    items: [
      { name: 'Ribbed Knit Cardigan', size: 'S', qty: 1, price: 109 },
      { name: 'Slim-Fit Oxford Shirt', size: 'L', qty: 2, price: 79 },
    ],
    total: 277,
  },
];

const statusColor = {
  Delivered:        'bg-green-100 text-green-700',
  'Out for Delivery': 'bg-blue-100 text-blue-700',
  Processing:       'bg-yellow-100 text-yellow-700',
  Cancelled:        'bg-red-100 text-red-700',
};

const Orders = () => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
    <Title text1="My" text2="Orders" />
    {MOCK_ORDERS.length === 0 ? (
      <p className="text-center text-gray-400 py-16">No orders yet.</p>
    ) : (
      <div className="space-y-6">
        {MOCK_ORDERS.map(order => (
          <div key={order.id} className="border border-gray-200 rounded p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{order.id}</p>
                <p className="text-xs text-gray-500 mt-0.5">{order.date}</p>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColor[order.status] || 'bg-gray-100 text-gray-600'}`}>
                {order.status}
              </span>
            </div>

            <div className="space-y-2 border-t border-gray-100 pt-4">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm text-gray-700">
                  <span>{item.name} <span className="text-gray-400">× {item.qty}</span> <span className="text-xs text-gray-400">({item.size})</span></span>
                  <span className="font-medium">${item.price * item.qty}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs text-gray-500 uppercase tracking-widest">Order Total</span>
              <span className="font-semibold text-rose-600">${order.total}</span>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Orders;
