import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  ShoppingBag, 
  Check, 
  ArrowRight, 
  Flame, 
  Clock, 
  Award,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

interface StarTreat {
  id: string;
  name: string;
  category: string;
  badge: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  tagline: string;
  image: string;
  textureNote: string;
  cocoaOrigin: string;
  freshness: string;
}

const STAR_TREATS: StarTreat[] = [
  {
    id: 'br-01',
    name: '70% Dark Chocolate Fudge Brownie',
    category: 'Signature Brownie',
    badge: 'OVEN STAR',
    price: 180,
    originalPrice: 200,
    rating: 4.9,
    reviews: 142,
    tagline: 'Molten Belgian core with paper-thin crinkle crust & Maldon sea salt',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=85',
    textureNote: 'Ultra Fudgy & Molten',
    cocoaOrigin: 'Belgian 70% Callebaut',
    freshness: 'Fresh Morning Batch #042',
  },
  {
    id: 'ck-02',
    name: 'Basque Burnt Caramel Cheesecake',
    category: 'Celebration Cake',
    badge: 'CHEF PRIDE',
    price: 920,
    rating: 4.9,
    reviews: 142,
    tagline: 'Caramelized outer crust with rich custardy Philadelphia cream center',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=85',
    textureNote: 'Silky Custard Melt',
    cocoaOrigin: 'Pure Bourbon Vanilla',
    freshness: 'Chilled Daily Batch',
  },
  {
    id: 'ck-cookie-01',
    name: 'NYC Style Monster Choc Chip Cookie',
    category: 'Monster Cookie (120g)',
    badge: 'BEST SELLER',
    price: 130,
    originalPrice: 150,
    rating: 4.9,
    reviews: 180,
    tagline: 'Crisp golden edge with giant flowing Callebaut chocolate puddles',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1000&q=85',
    textureNote: 'Crisp Edge • Gooey Center',
    cocoaOrigin: 'Dark Chocolate Buttons',
    freshness: 'Baked Fresh All Day',
  },
];

export const HeroShowcase: React.FC = () => {
  const { addToCart } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const activeTreat = STAR_TREATS[selectedIndex];
  const matchedProduct = PRODUCTS.find((p) => p.id === activeTreat.id) || PRODUCTS[0];

  const handleQuickAdd = () => {
    addToCart(matchedProduct, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  return (
    <div className="relative mx-auto max-w-xl bg-white rounded-4xl p-4 sm:p-5 border border-cream-200/90 shadow-2xl transition-all duration-300">
      
      {/* 1. Header / Switcher Pills */}
      <div className="flex items-center justify-between gap-2 mb-3.5 pb-3 border-b border-cream-100">
        <div className="flex items-center gap-1.5 p-1 bg-cream-100 rounded-full">
          {STAR_TREATS.map((t, idx) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                selectedIndex === idx
                  ? 'bg-chocolate-900 text-cream-50 shadow-soft-sm'
                  : 'text-chocolate-700 hover:text-chocolate-950 hover:bg-cream-200/60'
              }`}
            >
              {idx === 0 ? 'Fudge Brownie' : idx === 1 ? 'Basque Cake' : 'NYC Cookie'}
            </button>
          ))}
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-xs text-caramel-600 font-bold uppercase tracking-wider pr-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Star Bakes</span>
        </div>
      </div>

      {/* 2. Main High-Res Food Photo Showcase (100% visible, delicious & uncluttered) */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] rounded-3xl overflow-hidden bg-cream-200 shadow-soft mb-4 group">
        <img
          key={activeTreat.id}
          src={activeTreat.image}
          alt={activeTreat.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle vignette gradient for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 text-[10px] font-extrabold tracking-widest uppercase rounded-full bg-caramel-500 text-white shadow-soft">
            {activeTreat.badge}
          </span>

          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-chocolate-900 text-[11px] font-bold flex items-center gap-1.5 shadow-soft-sm">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>{activeTreat.freshness}</span>
          </span>
        </div>
      </div>

      {/* 3. Product Details & Action Bar (Cleanly structured below the photo) */}
      <div className="px-1 space-y-3">
        {/* Title, Category & Price Row */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-chocolate-500 mb-0.5">
              <span className="font-bold uppercase tracking-wider text-caramel-600 text-[10px]">
                {activeTreat.category}
              </span>
              <span>•</span>
              <div className="flex items-center gap-0.5 text-chocolate-800 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span>{activeTreat.rating}</span>
                <span className="text-chocolate-400 text-[11px]">({activeTreat.reviews} reviews)</span>
              </div>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-bold text-chocolate-950 leading-tight">
              {activeTreat.name}
            </h3>
          </div>

          <div className="text-right shrink-0">
            <div className="flex items-baseline gap-1.5 justify-end">
              <span className="font-bold text-2xl text-chocolate-950">
                ₹{activeTreat.price}
              </span>
              {activeTreat.originalPrice && (
                <span className="text-xs text-chocolate-400 line-through">
                  ₹{activeTreat.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block">
              In Stock • Fresh Today
            </span>
          </div>
        </div>

        {/* Tagline / Sensory Description */}
        <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed">
          {activeTreat.tagline}
        </p>

        {/* Flavor Notes & CTAs */}
        <div className="pt-2 border-t border-cream-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-xs text-chocolate-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Award className="w-3.5 h-3.5 text-caramel-600" />
              <span>{activeTreat.cocoaOrigin}</span>
            </span>
            <span className="text-cream-300">•</span>
            <span className="flex items-center gap-1.5 text-chocolate-500 hidden sm:flex">
              <Clock className="w-3.5 h-3.5 text-caramel-600" />
              <span>{activeTreat.textureNote}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to={matchedProduct ? `/product/${matchedProduct.id}` : '/shop'}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-full border border-cream-300 text-chocolate-800 text-xs font-semibold hover:bg-cream-100 transition-colors flex items-center justify-center gap-1"
            >
              <span>View Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isAdded}
              className={`flex-1 sm:flex-none px-5 py-2.5 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-soft transition-all duration-200 active:scale-95 ${
                isAdded
                  ? 'bg-emerald-600 text-white'
                  : 'bg-chocolate-900 text-cream-50 hover:bg-caramel-600'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added to Basket</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Quick Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
