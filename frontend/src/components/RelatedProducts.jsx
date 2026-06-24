import React from 'react';
import { useShop } from '../context/ShopContext';
import ProductItem from './ProductItem';
import Title from './Title';

const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useShop();
  const related = products
    .filter(p => p._id !== currentId && (p.category === category || p.subCategory === subCategory))
    .slice(0, 5);

  if (!related.length) return null;

  return (
    <section className="mt-20 max-w-7xl mx-auto px-4 sm:px-6">
      <Title text1="Related" text2="Products" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
        {related.map(p => <ProductItem key={p._id} {...p} />)}
      </div>
    </section>
  );
};

export default RelatedProducts;
