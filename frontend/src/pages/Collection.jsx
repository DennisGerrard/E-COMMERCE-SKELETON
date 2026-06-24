import React, { useState, useEffect, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';
import SearchBar from '../components/SearchBar';

const CATEGORIES = ['Women', 'Men', 'Kids'];
const SUB_CATS   = ['Topwear', 'Bottomwear', 'Winterwear', 'Outerwear'];

const Collection = () => {
  const { products, search, showSearch } = useShop();
  const [cat, setCat]         = useState([]);
  const [subCat, setSubCat]   = useState([]);
  const [sort, setSort]       = useState('relevant');
  const [showFilter, setShowFilter] = useState(false);

  const toggle = (arr, setArr, val) =>
    setArr(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (showSearch && search) list = list.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    if (cat.length)    list = list.filter(p => cat.includes(p.category));
    if (subCat.length) list = list.filter(p => subCat.includes(p.subCategory));
    if (sort === 'low-high') list.sort((a, b) => a.price - b.price);
    if (sort === 'high-low') list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, search, showSearch, cat, subCat, sort]);

  return (
    <>
      <SearchBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row gap-8">

          {/* Sidebar Filters */}
          <aside className="w-full sm:w-60 shrink-0">
            <button
              className="sm:hidden flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-gray-700 mb-4"
              onClick={() => setShowFilter(v => !v)}
            >
              Filters
              <svg className={`w-4 h-4 transition-transform ${showFilter ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M9 5l7 7-7 7"/>
              </svg>
            </button>

            <div className={`${showFilter ? 'block' : 'hidden'} sm:block`}>
              {/* Category */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Category</p>
                {CATEGORIES.map(c => (
                  <label key={c} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cat.includes(c)}
                      onChange={() => toggle(cat, setCat, c)}
                      className="accent-rose-500"
                    />
                    <span className="text-sm text-gray-700">{c}</span>
                  </label>
                ))}
              </div>

              {/* Sub-category */}
              <div className="mb-6">
                <p className="text-xs uppercase tracking-widest text-gray-500 mb-3 font-semibold">Type</p>
                {SUB_CATS.map(s => (
                  <label key={s} className="flex items-center gap-2 mb-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subCat.includes(s)}
                      onChange={() => toggle(subCat, setSubCat, s)}
                      className="accent-rose-500"
                    />
                    <span className="text-sm text-gray-700">{s}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <Title text1="All" text2="Collections" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-sm border border-gray-300 px-3 py-2 outline-none focus:border-rose-400 h-fit"
              >
                <option value="relevant">Sort: Relevant</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm py-10 text-center">No products found.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {filtered.map(p => <ProductItem key={p._id} {...p} />)}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
};

export default Collection;
