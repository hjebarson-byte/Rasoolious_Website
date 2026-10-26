import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuantitySelector } from './QuantitySelector';
import { Link } from 'react-router-dom';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll when modal open
  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setIsAdded(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  if (!product) return null;

  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-chocolate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-card-hover overflow-hidden transition-all duration-300 transform scale-100 max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-chocolate-700 hover:text-chocolate-950 flex items-center justify-center shadow-soft-sm transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="w-full md:w-1/2 aspect-square md:aspect-auto bg-cream-100 relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold tracking-wider rounded-full bg-caramel-500 text-white shadow-soft-sm">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs text-chocolate-500 mb-2">
              <span className="font-semibold uppercase tracking-wider text-caramel-600">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-chocolate-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-semibold">{product.rating}</span>
                <span className="text-chocolate-400">({product.reviews} reviews)</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl md:text-3xl text-chocolate-900 font-medium mb-2">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="font-semibold text-2xl text-chocolate-900">
                ₹{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-chocolate-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
              {product.weight && (
                <span className="text-xs text-chocolate-500 ml-1">
                  • {product.weight}
                </span>
              )}
            </div>

            <p className="text-sm text-chocolate-600 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Quick Specs */}
            <div className="space-y-2 mb-6 text-xs text-chocolate-600 bg-cream-50 p-3.5 rounded-2xl border border-cream-200">
              <p>
                <span className="font-semibold text-chocolate-800">Freshness: </span>
                Baked daily in micro-batches
              </p>
              <p>
                <span className="font-semibold text-chocolate-800">Allergens: </span>
                {product.allergens.join(', ')}
              </p>
            </div>
          </div>

          {/* Action Row */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-semibold text-chocolate-700 uppercase tracking-wide">
                Quantity
              </span>
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity((q) => q + 1)}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isAdded}
                className={`flex-1 py-3.5 px-6 rounded-full text-sm font-semibold flex items-center justify-center gap-2 shadow-soft transition-all duration-200 active:scale-98 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-chocolate-900 text-cream-50 hover:bg-caramel-600'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart • ₹{product.price * quantity}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(product.id)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                className={`w-12 h-12 rounded-full border border-caramel-200 flex items-center justify-center transition-colors ${
                  wishlisted
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-chocolate-700 hover:text-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="mt-3 text-center">
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="text-xs text-caramel-600 hover:text-chocolate-900 underline font-medium"
              >
                View Full Product Details & Ingredients →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
