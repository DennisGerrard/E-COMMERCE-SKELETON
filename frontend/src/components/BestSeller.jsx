import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const BestSeller = () => {
  const { products } = useShop();
  const bestsellers = products.filter(p => p.bestseller || p.bestSeller).slice(0, 5);

  return (
    <section className="bg-glam py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <Title text1="Best" text2="Sellers" />
        <p className="text-center text-gray-500 -mt-6 mb-10 text-sm max-w-md mx-auto">
          Our most-loved pieces — adored by thousands of Glam customers worldwide.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5 md:gap-6">
          {bestsellers.map(p => <ProductItem key={p._id} {...p} />)}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
