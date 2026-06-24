import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShop();
  const [product, setProduct] = useState(null);
  const [image, setImage]     = useState('');
  const [size, setSize]       = useState('');
  const [tab, setTab]         = useState('description');

  useEffect(() => {
    const found = products.find(p => p._id === productId);
    setProduct(found || null);
    setImage(found?.image?.[0] || '');
    setSize('');
  }, [productId, products]);

  if (!product) return (
    <div className="min-h-[50vh] flex items-center justify-center text-gray-400">Product not found.</div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Product details */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Images */}
        <div className="flex flex-col-reverse md:flex-row gap-4 flex-1">
          <div className="flex md:flex-col gap-3 overflow-auto md:overflow-y-auto">
            {product.image.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setImage(img)}
                className={`w-16 h-20 object-cover cursor-pointer transition-all ${image === img ? 'border-2 border-rose-500' : 'border border-gray-200 opacity-70'}`}
                onError={e => { e.target.src = 'https://placehold.co/64x80?text=G'; }}
                alt=""
              />
            ))}
          </div>
          <div className="flex-1 aspect-[3/4] overflow-hidden">
            <img
              src={image}
              alt={product.name}
              className="w-full h-full object-cover object-top"
              onError={e => { e.target.src = 'https://placehold.co/600x800?text=Glam'; }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 max-w-md">
          <p className="text-xs text-rose-500 uppercase tracking-widest mb-1">{product.category} · {product.subCategory}</p>
          <h1 className="font-playfair text-3xl text-gray-800 mb-2">{product.name}</h1>
          <p className="text-2xl text-rose-600 font-semibold mb-4">{currency}{product.price}</p>

          {/* Stars */}
          <div className="flex items-center gap-1 mb-5">
            {[...Array(4)].map((_, i) => <span key={i} className="text-gold text-sm">★</span>)}
            <span className="text-gray-400 text-sm">★</span>
            <span className="text-xs text-gray-500 ml-2">(122 reviews)</span>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed mb-6">{product.description}</p>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Select Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 text-sm border transition-all ${
                    size === s
                      ? 'border-rose-500 bg-rose-500 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-rose-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(product._id, size)}
            className="btn-primary w-full mb-4"
          >
            Add to Cart
          </button>

          <div className="text-xs text-gray-500 space-y-1 border-t pt-4">
            <p>✅ 100% Original product</p>
            <p>🚚 Free shipping on orders over $100</p>
            <p>🔄 Easy 30-day returns</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-0 border-b border-gray-200">
          {['description', 'reviews'].map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm uppercase tracking-widest transition-all ${
                tab === t ? 'border-b-2 border-rose-500 text-rose-600 font-semibold' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="py-6 text-sm text-gray-600 leading-relaxed">
          {tab === 'description'
            ? <p>{product.description} Crafted with premium materials and designed for all-day comfort. Every Glam piece undergoes rigorous quality checks to ensure the highest standards.</p>
            : <p className="text-gray-400 italic">Reviews coming soon…</p>
          }
        </div>
      </div>

      <RelatedProducts category={product.category} subCategory={product.subCategory} currentId={productId} />
    </div>
  );
};

export default Product;
