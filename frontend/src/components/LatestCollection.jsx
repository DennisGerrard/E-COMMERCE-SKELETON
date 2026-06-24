import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const LatestCollection = () => {
  const { products } = useShop();
  const latest = products.slice(0, 8);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <Title text1="Latest" text2="Collection" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 md:gap-7">
        {latest.map(p => <ProductItem key={p._id} {...p} />)}
      </div>
      <div className="text-center mt-10">
        <Link to="/collection" className="btn-outline">View All</Link>
      </div>
    </section>
  );
};

export default LatestCollection;
