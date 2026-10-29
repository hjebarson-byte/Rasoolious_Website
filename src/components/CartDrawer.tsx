import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';
import { QuantitySelector } from './QuantitySelector';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartSubtotal,
    getCartCount,
  } = useCart();

  const navigate = useNavigate();
  const subtotal = getCartSubtotal();
  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
      className="fixed inset-0 z-50 flex justify-end bg-chocolate-900/50 backdrop-blur-sm transition-opacity duration-300"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-cream-200 flex items-center justify-between bg-cream-50/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-caramel-600" />
            <h3 className="font-serif text-xl font-semibold text-chocolate-900">
              Your Basket
            </h3>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-caramel-200 text-chocolate-800">
              {getCartCount()}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart drawer"
            className="w-8 h-8 rounded-full flex items-center justify-center text-chocolate-600 hover:text-chocolate-950 hover:bg-cream-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="bg-caramel-50 px-5 py-3 border-b border-caramel-200/60 text-xs">
          {amountNeededForFreeShipping === 0 ? (
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <Sparkles className="w-4 h-4 fill-emerald-500 text-emerald-500" />
              <span>You've unlocked FREE fresh bakery delivery!</span>
            </div>
          ) : (
            <p className="text-chocolate-700 font-medium">
              Add <span className="font-bold text-chocolate-900">₹{amountNeededForFreeShipping}</span> more to unlock <span className="font-bold text-caramel-600">FREE delivery</span>
            </p>
          )}

          <div className="w-full h-1.5 bg-caramel-200/80 rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-caramel-500 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-cream-100">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-chocolate-500">
              <div className="w-16 h-16 rounded-full bg-cream-100 flex items-center justify-center mb-4 text-3xl">
                🧁
              </div>
              <h4 className="font-serif text-lg font-medium text-chocolate-900 mb-1">
                Your basket is empty
              </h4>
              <p className="text-xs text-chocolate-600 max-w-xs mb-6">
                Fresh warm artisanal brownies and molten fudge slabs are calling your name.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="px-6 py-2.5 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors"
              >
                Explore Treats
              </button>
            </div>
          ) : (
            cartItems.map(({ product, quantity, selectedFlavours }, index) => (
              <div key={`${product.id}-${index}`} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                {/* Product thumbnail */}
                <Link
                  to={`/product/${product.id}`}
                  onClick={() => setIsCartOpen(false)}
                  className="w-16 h-16 rounded-xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </Link>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${product.id}`}
                    onClick={() => setIsCartOpen(false)}
                    className="font-serif text-sm font-medium text-chocolate-900 truncate block hover:text-caramel-600 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <div className="text-xs text-chocolate-500 mt-0.5">
                    ₹{product.price} each
                  </div>

                  {/* Display selected 4 flavours if it's a gift box */}
                  {selectedFlavours && selectedFlavours.length > 0 && (
                    <div className="mt-1.5 p-1.5 rounded-lg bg-cream-100/80 border border-cream-200 text-[10px] space-y-0.5 text-chocolate-700">
                      <span className="font-semibold text-caramel-700 block">Chosen 4 Flavours:</span>
                      <div className="flex flex-wrap gap-1">
                        {selectedFlavours.map((flv, idx) => (
                          <span key={idx} className="bg-white/90 border border-caramel-200 px-1.5 py-0.5 rounded text-[10px]">
                            {flv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => increaseQuantity(product.id, selectedFlavours)}
                      onDecrease={() => decreaseQuantity(product.id, selectedFlavours)}
                      size="sm"
                    />
                    <span className="font-semibold text-sm text-chocolate-900">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFromCart(product.id, selectedFlavours)}
                  aria-label={`Remove ${product.name} from cart`}
                  className="p-1.5 text-chocolate-400 hover:text-rose-600 transition-colors self-start"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & CTAs */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-cream-200 bg-cream-50/60 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-chocolate-600">Subtotal</span>
              <span className="font-semibold text-chocolate-900 text-base">
                ₹{subtotal}
              </span>
            </div>
            <p className="text-[11px] text-chocolate-500 leading-tight">
              Taxes calculated at checkout. Packaging & ice pack included.
            </p>

            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
                className="py-3 px-4 rounded-full border border-chocolate-800 text-chocolate-900 text-xs font-semibold hover:bg-cream-200 transition-colors text-center"
              >
                View Full Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="py-3 px-4 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors flex items-center justify-center gap-1.5 shadow-soft"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
