import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, X, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import type { CategoryType, Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';

const CATEGORIES: CategoryType[] = [
  'All',
  'Brownies',
  'Cakes',
  'Cookies',
  'Gift Boxes',
  'Specials',
];

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Read initial states from URL params
  const categoryParam = (searchParams.get('category') as CategoryType) || 'All';
  const queryParam = searchParams.get('q') || '';
  const sortParam = searchParams.get('sort') || 'featured';

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    CATEGORIES.includes(categoryParam) ? categoryParam : 'All'
  );
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [sortBy, setSortBy] = useState(sortParam);
  const [onlyEggless, setOnlyEggless] = useState(false);
  const [maxPrice, setMaxPrice] = useState(2000);

  // Sync state if URL changes
  useEffect(() => {
    const cat = searchParams.get('category') as CategoryType;
    if (cat && CATEGORIES.includes(cat)) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Update URL params
  const handleCategoryChange = (cat: CategoryType) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', cat);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query) {
      newParams.delete('q');
    } else {
      newParams.set('q', query);
    }
    setSearchParams(newParams);
  };

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Eggless filter
      if (onlyEggless && !product.isEggless) {
        return false;
      }
      // Price filter
      if (product.price > maxPrice) {
        return false;
      }
      // Search query filter (search name, category, description, ingredients)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIng = product.ingredients.some((i) =>
          i.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesCategory && !matchesDesc && !matchesIng) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return a.badge === 'NEW' ? -1 : 1;
        case 'best-selling':
          return a.reviews - b.reviews;
        default:
          return 0; // featured
      }
    });
  }, [selectedCategory, searchQuery, sortBy, onlyEggless, maxPrice]);

  return (
    <div className="pt-28 pb-20 min-h-screen bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 pt-4">
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-caramel-100 text-chocolate-800 border border-caramel-300">
            Fresh From The Oven
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl text-chocolate-950 font-normal tracking-tight">
            Shop All Treats
          </h1>
          <p className="mt-3 text-chocolate-600 text-base sm:text-lg">
            Find your next favourite bite. Baked fresh daily with pure chocolate & butter.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-soft border border-cream-200 mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 text-chocolate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search brownies, cakes, cookies..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-11 pr-10 py-3 rounded-full bg-cream-50 border border-cream-200 text-sm text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:ring-2 focus:ring-caramel-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-chocolate-400 hover:text-chocolate-900"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Toggles & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
              {/* Eggless Toggle */}
              <button
                type="button"
                onClick={() => setOnlyEggless(!onlyEggless)}
                className={`px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                  onlyEggless
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                    : 'bg-white border-cream-300 text-chocolate-700 hover:bg-cream-50'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    onlyEggless ? 'bg-emerald-600' : 'bg-chocolate-400'
                  }`}
                />
                <span>Eggless Only</span>
              </button>

              {/* Price Filter slider modal/compact */}
              <div className="flex items-center gap-2 text-xs text-chocolate-700 bg-cream-50 px-3.5 py-2 rounded-full border border-cream-200">
                <SlidersHorizontal className="w-3.5 h-3.5 text-caramel-600" />
                <span>Under ₹{maxPrice}</span>
                <input
                  type="range"
                  min="120"
                  max="2000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-20 accent-caramel-600 cursor-pointer"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex items-center gap-1.5 bg-cream-50 px-3.5 py-2 rounded-full border border-cream-200 text-xs font-medium text-chocolate-800">
                <ArrowUpDown className="w-3.5 h-3.5 text-caramel-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none cursor-pointer pr-2"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="best-selling">Sort: Best Selling</option>
                  <option value="rating">Sort: Top Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Sort: Newest</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Chips Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar border-t border-cream-100">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? 'bg-chocolate-900 text-cream-50 shadow-soft-sm'
                      : 'bg-cream-100 text-chocolate-700 hover:bg-cream-200 hover:text-chocolate-950'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter and Active filters */}
        <div className="flex items-center justify-between mb-6 text-xs text-chocolate-600 px-1">
          <div>
            Showing <strong className="text-chocolate-900">{filteredProducts.length}</strong> treats
            {selectedCategory !== 'All' && <span> in <strong>{selectedCategory}</strong></span>}
            {searchQuery && <span> matching "<strong>{searchQuery}</strong>"</span>}
          </div>

          {(selectedCategory !== 'All' || searchQuery || onlyEggless || maxPrice < 2000) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyEggless(false);
                setMaxPrice(2000);
                setSearchParams({});
              }}
              className="text-caramel-600 hover:text-chocolate-950 underline font-medium"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-cream-200 max-w-md mx-auto my-12 shadow-soft">
            <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mx-auto mb-4 text-3xl">
              🍪
            </div>
            <h3 className="font-serif text-2xl text-chocolate-900 font-medium mb-2">
              No matching treats found
            </h3>
            <p className="text-xs text-chocolate-600 mb-6 leading-relaxed">
              We couldn't find anything matching your search. Try searching for "fudge", "brownie", "biscoff", or clear your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyEggless(false);
                setMaxPrice(2000);
              }}
              className="px-6 py-3 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
