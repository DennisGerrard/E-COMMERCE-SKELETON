import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <p className="mb-4 text-lg font-medium text-gray-700">All Products List</p>
      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 border bg-gray-50 text-sm font-semibold text-gray-600 rounded">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        
        {list.map((item, index) => (
          <div className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-3 px-4 border rounded bg-white shadow-sm hover:shadow transition-shadow text-sm" key={index}>
            <img 
              className="w-12 h-14 object-cover rounded bg-gray-100" 
              src={item.image[0]} 
              onError={e => { e.target.src = 'https://placehold.co/80x96?text=Image'; }} 
              alt="" 
            />
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="text-rose-600 font-semibold">{currency}{item.price}</p>
            <p onClick={() => removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg hover:text-rose-600 transition-colors">🗑️</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
