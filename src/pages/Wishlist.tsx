import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

export const Wishlist: React.FC = () => {
  const { wishlistProducts, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistProducts.length === 0) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream-50">
        <div className="w-20 h-20 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-4 shadow-soft-sm">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal mb-2">
          Your wishlist is empty
        </h1>
        <p className="text-chocolate-600 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
          Save your favourite brownies, cookies and cakes here for your next craving.
        </p>
        <Link
          to="/shop"
          className="px-8 py-4 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold uppercase tracking-wider hover:bg-caramel-600 transition-colors shadow-soft"
        >
          Explore Fresh Treats
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-cream-200 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">
              Saved Cravings
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal mt-1">
              My Wishlist ({wishlistProducts.length})
            </h1>
          </div>

          <button
            type="button"
            onClick={clearWishlist}
            className="text-xs text-chocolate-500 hover:text-rose-600 underline font-medium self-start sm:self-auto"
          >
            Clear all saved treats
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl p-4 border border-cream-200 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-cream-100 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 text-rose-600 hover:bg-white flex items-center justify-center shadow-soft-sm transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-caramel-600 block mb-1">
                  {product.category}
                </span>

                <Link
                  to={`/product/${product.id}`}
                  className="font-serif text-lg font-medium text-chocolate-900 block hover:text-caramel-600 transition-colors mb-1 line-clamp-1"
                >
                  {product.name}
                </Link>

                <p className="text-xs text-chocolate-600 line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-cream-100 flex items-center justify-between gap-2">
                <span className="font-bold text-base text-chocolate-900">
                  ₹{product.price}
                </span>

                <button
                  type="button"
                  onClick={() => addToCart(product, 1)}
                  className="px-4 py-2 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-soft-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
