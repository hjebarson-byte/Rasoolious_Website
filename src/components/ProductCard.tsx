import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag, Check, Eye } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D perspective tilt state
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const wishlisted = isWishlisted(product.id);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Smooth tilt angles (-8deg to +8deg)
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;

    setTilt({ x: rotateX, y: rotateY });
    setGlare({ x: x * 100, y: y * 100, opacity: 0.22 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'BEST SELLER':
        return 'bg-gradient-to-r from-amber-500 to-caramel-500 text-white shadow-amber-500/20';
      case 'NEW':
        return 'bg-gradient-to-r from-terracotta-500 to-rose-500 text-white shadow-rose-500/20';
      case 'LIMITED':
        return 'bg-chocolate-900 text-cream-100 border border-caramel-400/40';
      case 'CHEF SPECIAL':
        return 'bg-gradient-to-r from-caramel-600 to-amber-600 text-white';
      case 'SALE':
        return 'bg-rose-600 text-white';
      default:
        return 'bg-chocolate-700 text-white';
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${tilt.x !== 0 ? -6 : 0}px)`,
        transition: tilt.x === 0 ? 'transform 0.4s ease-out' : 'transform 0.08s ease-out',
        transformStyle: 'preserve-3d',
      }}
      className="group relative flex flex-col bg-white rounded-3xl p-3 sm:p-4 border border-cream-200/80 shadow-soft hover:shadow-card-hover will-change-transform"
    >
      {/* Dynamic Specular Light Glare Overlay */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-30"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, ${glare.opacity}) 0%, transparent 65%)`,
        }}
      />

      {/* Product Image Box */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full aspect-square rounded-2xl overflow-hidden bg-cream-100 mb-3.5 z-10"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badge with subtle gold foil sheen */}
        {product.badge && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[10px] font-extrabold tracking-wider rounded-full shadow-md uppercase ${getBadgeStyle(
              product.badge
            )}`}
          >
            {product.badge}
          </span>
        )}

        {/* Dietary Icon: Eggless green dot */}
        {product.isEggless && (
          <span
            title="100% Eggless"
            className="absolute top-3 right-12 w-6 h-6 rounded-full bg-white/95 backdrop-blur-sm border border-emerald-600 flex items-center justify-center shadow-soft-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 shadow-soft-sm ${
            wishlisted
              ? 'bg-rose-50 text-rose-600 scale-110'
              : 'bg-white/90 text-chocolate-600 hover:text-rose-600 hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform duration-200 ${
              wishlisted ? 'fill-current scale-110' : ''
            }`}
          />
        </button>

        {/* Quick View Button overlay */}
        {onQuickView && (
          <button
            type="button"
            onClick={handleQuickView}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-chocolate-800 text-xs font-medium shadow-soft opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 flex items-center gap-1.5 hover:bg-caramel-50 hover:text-caramel-600"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        )}
      </Link>

      {/* Info Container */}
      <div className="flex flex-col flex-1 z-10">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-chocolate-500 mb-1.5">
          <span className="font-semibold tracking-wide uppercase text-[10px] text-caramel-600">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-chocolate-700 font-medium">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{product.rating}</span>
            <span className="text-chocolate-400 text-[11px]">({product.reviews})</span>
          </div>
        </div>

        {/* Product Title */}
        <Link
          to={`/product/${product.id}`}
          className="font-serif text-lg text-chocolate-900 font-medium line-clamp-1 group-hover:text-caramel-600 transition-colors mb-1"
        >
          {product.name}
        </Link>

        {/* Short description */}
        <p className="text-xs text-chocolate-600 line-clamp-2 leading-relaxed mb-3">
          {product.shortDescription}
        </p>

        {/* Price & Action Row */}
        <div className="mt-auto pt-2 border-t border-cream-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-semibold text-lg text-chocolate-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-chocolate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            {product.weight && (
              <span className="text-[11px] text-chocolate-400 block">
                {product.weight}
              </span>
            )}
          </div>

          {/* Add to Cart Micro-interaction button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 active:scale-95 shadow-sm ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-chocolate-900 text-cream-50 hover:bg-caramel-600 hover:shadow-soft'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
