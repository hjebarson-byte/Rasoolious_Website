import React from 'react';
import { 
  Plus, 
  Search, 
  Edit2 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

export const InventoryScreen: React.FC = () => {
  const { 
    products, 
    inventoryCategory, 
    setInventoryCategory, 
    inventorySearch, 
    setInventorySearch, 
    openModal, 
    toggleProductStatus 
  } = useAdmin();

  const categories = ['All', 'Brownies', 'Cookies', 'Cakes', 'Gift Boxes', 'Specials'];

  // Metrics
  const inStockCount = products.filter(p => p.status === 'In Stock').length;
  const limitedCount = products.filter(p => p.status === 'Limited Stock').length;
  const soldOutCount = products.filter(p => p.status === 'Sold Out').length;

  const filteredProducts = products.filter(prod => {
    if (inventoryCategory !== 'All' && prod.category !== inventoryCategory) {
      return false;
    }
    if (inventorySearch.trim()) {
      const q = inventorySearch.toLowerCase();
      return (
        prod.name.toLowerCase().includes(q) ||
        prod.category.toLowerCase().includes(q) ||
        prod.ingredients.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
            Daily Batch & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-300 mt-1">
            Control freshly baked product availability, daily production ceilings, and customer menus.
          </p>
        </div>

        <button
          onClick={() => openModal('addProduct')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Treat</span>
        </button>
      </div>

      {/* Inventory KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-chocolate-950 border border-chocolate-850 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate-400">Total Treats</span>
          <div className="font-serif font-black text-2xl text-cream-50 mt-1">{products.length}</div>
          <span className="text-[11px] text-caramel-400 font-semibold">Active catalog</span>
        </div>

        <div className="bg-chocolate-950 border border-chocolate-850 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate-400">In Stock</span>
          <div className="font-serif font-black text-2xl text-emerald-400 mt-1">{inStockCount}</div>
          <span className="text-[11px] text-chocolate-400">Accepting orders</span>
        </div>

        <div className="bg-chocolate-950 border border-chocolate-850 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate-400">Limited Stock</span>
          <div className="font-serif font-black text-2xl text-amber-400 mt-1">{limitedCount}</div>
          <span className="text-[11px] text-chocolate-400">Near daily batch limit</span>
        </div>

        <div className="bg-chocolate-950 border border-chocolate-850 rounded-2xl p-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-chocolate-400">Sold Out</span>
          <div className="font-serif font-black text-2xl text-terracotta-400 mt-1">{soldOutCount}</div>
          <span className="text-[11px] text-chocolate-400">Daily limit reached</span>
        </div>
      </div>

      {/* Filter and Category Tabs */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => {
              const count = cat === 'All' 
                ? products.length 
                : products.filter(p => p.category === cat).length;
              const isActive = inventoryCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setInventoryCategory(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-caramel-500 to-caramel-600 text-chocolate-950 font-bold shadow-sm'
                      : 'bg-chocolate-900 hover:bg-chocolate-850 text-chocolate-300 hover:text-cream-100'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-chocolate-950/20 text-chocolate-950 font-bold' : 'bg-chocolate-800 text-chocolate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-chocolate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inventorySearch}
              onChange={e => setInventorySearch(e.target.value)}
              placeholder="Search treat name, cocoa..."
              className="w-full bg-chocolate-900 border border-chocolate-800 rounded-xl pl-9 pr-3.5 py-2 text-xs text-cream-50 focus:border-caramel-400 focus:outline-none"
            />
          </div>

        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredProducts.map(prod => {
          const bookedPct = Math.min(100, Math.round((prod.booked / prod.dailyLimit) * 100));
          const isSoldOut = prod.status === 'Sold Out' || prod.booked >= prod.dailyLimit;

          return (
            <div
              key={prod.id}
              className="bg-chocolate-950 border border-chocolate-850 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between group hover:border-chocolate-700 transition-all"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-44 bg-chocolate-900 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = '/images/fudge_brownie.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-chocolate-950/80 backdrop-blur-md text-caramel-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-chocolate-800">
                      {prod.category}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm ${
                      isSoldOut
                        ? 'bg-terracotta-500/80 text-white'
                        : prod.status === 'Limited Stock'
                        ? 'bg-amber-500/80 text-chocolate-950'
                        : 'bg-emerald-600/80 text-white'
                    }`}>
                      {prod.status}
                    </span>
                  </div>

                  {/* Weight label at bottom of image */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] text-cream-200 font-medium">
                    {prod.weight}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-sm text-cream-50 leading-snug group-hover:text-caramel-300 transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="font-bold text-base text-caramel-300">
                      ₹{prod.salePrice || prod.price}
                    </span>
                    {prod.salePrice && prod.salePrice < prod.price && (
                      <span className="text-xs text-chocolate-400 line-through">
                        ₹{prod.price}
                      </span>
                    )}
                  </div>

                  {/* Daily Limit Progress Bar */}
                  <div className="space-y-1.5 bg-chocolate-900/60 p-2.5 rounded-xl border border-chocolate-850">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-chocolate-400">Daily Kitchen Batch:</span>
                      <span className="font-bold text-cream-100 font-mono">
                        {prod.booked} / {prod.dailyLimit} booked
                      </span>
                    </div>
                    <div className="w-full bg-chocolate-950 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isSoldOut ? 'bg-terracotta-500' : 'bg-caramel-500'
                        }`}
                        style={{ width: `${bookedPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Allergens */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-chocolate-400">
                    {prod.allergens.map(a => (
                      <span key={a} className="bg-chocolate-900 px-1.5 py-0.5 rounded text-chocolate-300">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-chocolate-900/60 border-t border-chocolate-850 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleProductStatus(prod.id)}
                  className={`text-[11px] font-semibold px-2.5 py-1.5 rounded-xl transition-colors ${
                    isSoldOut
                      ? 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                      : 'bg-chocolate-800 text-chocolate-300 hover:text-white'
                  }`}
                >
                  {isSoldOut ? 'Reopen Orders' : 'Mark Sold Out'}
                </button>

                <button
                  onClick={() => openModal('editProduct', prod)}
                  className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-caramel-300 transition-colors"
                >
                  <Edit2 className="w-3 h-3" />
                  <span>Edit</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
