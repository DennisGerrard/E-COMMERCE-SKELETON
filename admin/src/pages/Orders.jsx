import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return null;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <h3 className="mb-4 text-lg font-medium text-gray-700">Order Page</h3>
      <div>
        {orders.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-6 md:p-8 my-4 md:my-6 bg-white shadow-sm rounded-lg text-sm text-gray-700" key={index}>
            <span className="text-4xl">📦</span>
            <div>
              <div>
                {order.items.map((item, idx) => (
                  <p className="py-0.5 font-medium" key={idx}>
                    {item.name} x {item.quantity} <span>({item.size})</span>
                  </p>
                ))}
              </div>
              <p className="mt-4 font-semibold text-gray-900">{order.address.firstName + " " + order.address.lastName}</p>
              <div className="text-gray-500 leading-relaxed mt-1">
                <p>{order.address.street},</p>
                <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              </div>
              <p className="mt-2 text-gray-600">Tel: {order.address.phone}</p>
            </div>
            <div>
              <p className="text-sm mb-1"><span className="text-gray-400 uppercase tracking-widest font-semibold text-[10px]">Items:</span> {order.items.length}</p>
              <p className="text-sm mb-1"><span className="text-gray-400 uppercase tracking-widest font-semibold text-[10px]">Method:</span> {order.paymentMethod}</p>
              <p className="text-sm"><span className="text-gray-400 uppercase tracking-widest font-semibold text-[10px]">Payment:</span> <span className={order.payment ? 'text-green-600 font-semibold' : 'text-rose-600 font-medium'}>{order.payment ? 'Done' : 'Pending'}</span></p>
              <p className="text-sm mt-1"><span className="text-gray-400 uppercase tracking-widest font-semibold text-[10px]">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-lg font-bold text-gray-900">{currency}{order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 border border-gray-300 font-semibold text-sm outline-none rounded bg-gray-50 focus:border-rose-400 cursor-pointer w-full max-w-[150px]">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
