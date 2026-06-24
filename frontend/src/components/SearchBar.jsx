import React from 'react';
import { useShop } from '../context/ShopContext';

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useShop();

  if (!showSearch) return null;

  return (
    <div className="bg-rose-50 border-b border-rose-100 py-4 px-4">
      <div className="max-w-xl mx-auto flex items-center gap-3">
        <div className="flex items-center flex-1 bg-white border border-rose-200 rounded-full px-4 gap-2 shadow-sm">
          <svg className="w-4 h-4 text-rose-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            autoFocus
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search for products…"
            className="flex-1 py-2 text-sm outline-none bg-transparent text-gray-700 placeholder-gray-400"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-gray-400 hover:text-rose-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>
        <button onClick={() => setShowSearch(false)} className="text-gray-500 hover:text-rose-500 text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
