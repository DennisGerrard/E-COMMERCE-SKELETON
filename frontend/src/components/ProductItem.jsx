import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

const ProductItem = ({ _id, image, name, price }) => {
  const { currency } = useShop();

  return (
    <Link
      to={`/product/${_id}`}
      className="group block"
    >
      <div className="overflow-hidden bg-gray-50 aspect-[3/4] relative">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.target.src = 'https://placehold.co/400x533?text=Glam'; }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm text-center py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-xs text-rose-600 uppercase tracking-widest font-semibold">Quick View</span>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-700 truncate">{name}</p>
        <p className="text-sm font-semibold text-rose-600 mt-0.5">{currency}{price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;
