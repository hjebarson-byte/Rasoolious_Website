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

  const categories = ['All', 'Signature Brownies', 'Gift Boxes'];

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
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            Daily Brownie Batch & Inventory
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Control freshly baked artisanal brownie slab availability, daily tray limits, and customer orders.
          </p>
        </div>

        <button
          onClick={() => openModal('addProduct')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Brownie</span>
        </button>
      </div>

      {/* Inventory KPI Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Total Brownies</span>
          <div className="font-serif font-black text-2xl text-chocolate-950 mt-1">{products.length}</div>
          <span className="text-[11px] text-caramel-700 font-semibold">Active catalog</span>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">In Stock</span>
          <div className="font-serif font-black text-2xl text-emerald-700 mt-1">{inStockCount}</div>
          <span className="text-[11px] text-stone-500">Accepting orders</span>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Limited Stock</span>
          <div className="font-serif font-black text-2xl text-amber-700 mt-1">{limitedCount}</div>
          <span className="text-[11px] text-stone-500">Near daily batch limit</span>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500">Sold Out</span>
          <div className="font-serif font-black text-2xl text-rose-700 mt-1">{soldOutCount}</div>
          <span className="text-[11px] text-stone-500">Daily limit reached</span>
        </div>
      </div>

      {/* Filter and Category Tabs */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
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
                      ? 'bg-caramel-500 text-white font-bold shadow-sm'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/70'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={inventorySearch}
              onChange={e => setInventorySearch(e.target.value)}
              placeholder="Search treat name, cocoa..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2 text-xs text-chocolate-900 placeholder:text-stone-400 focus:bg-white focus:border-caramel-500 focus:outline-none"
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
              className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs flex flex-col justify-between group hover:border-caramel-300 hover:shadow-sm transition-all"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative h-44 bg-stone-100 overflow-hidden">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e: any) => {
                      e.target.src = '/images/fudge_brownie.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="bg-white/90 backdrop-blur-md text-chocolate-950 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  {/* Status Pill */}
                  <div className="absolute top-3 right-3">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs ${
                      isSoldOut
                        ? 'bg-rose-500 text-white'
                        : prod.status === 'Limited Stock'
                        ? 'bg-amber-400 text-stone-900'
                        : 'bg-emerald-600 text-white'
                    }`}>
                      {prod.status}
                    </span>
                  </div>

                  {/* Weight label at bottom of image */}
                  <div className="absolute bottom-2.5 left-3 text-[11px] text-white font-semibold drop-shadow-sm">
                    {prod.weight}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-serif font-bold text-sm text-chocolate-950 leading-snug group-hover:text-caramel-700 transition-colors">
                      {prod.name}
                    </h3>
                  </div>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 font-mono">
                    <span className="font-bold text-base text-caramel-700">
                      ₹{prod.salePrice || prod.price}
                    </span>
                    {prod.salePrice && prod.salePrice < prod.price && (
                      <span className="text-xs text-stone-400 line-through">
                        ₹{prod.price}
                      </span>
                    )}
                  </div>

                  {/* Daily Limit Progress Bar */}
                  <div className="space-y-1.5 bg-stone-50 p-2.5 rounded-2xl border border-stone-200/70">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-500">Daily Kitchen Batch:</span>
                      <span className="font-bold text-chocolate-900 font-mono">
                        {prod.booked} / {prod.dailyLimit} booked
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isSoldOut ? 'bg-rose-500' : 'bg-caramel-500'
                        }`}
                        style={{ width: `${bookedPct}%` }}
                      />
                    </div>
                  </div>

                  {/* Allergens */}
                  <div className="flex flex-wrap gap-1 text-[10px] text-stone-500">
                    {prod.allergens.map(a => (
                      <span key={a} className="bg-stone-100 px-2 py-0.5 rounded-md text-stone-700 font-medium">
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => toggleProductStatus(prod.id)}
                  className={`text-[11px] font-semibold px-3 py-1.5 rounded-xl transition-colors ${
                    isSoldOut
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border border-emerald-200'
                      : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {isSoldOut ? 'Reopen Orders' : 'Mark Sold Out'}
                </button>

                <button
                  onClick={() => openModal('editProduct', prod)}
                  className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-white hover:bg-stone-100 text-chocolate-900 border border-stone-200 shadow-xs transition-colors"
                >
                  <Edit2 className="w-3 h-3 text-caramel-600" />
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
