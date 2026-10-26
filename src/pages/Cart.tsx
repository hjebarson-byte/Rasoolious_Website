import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Trash2, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  ArrowLeft
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';
import { QuantitySelector } from '../components/QuantitySelector';

export const Cart: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    getCartSubtotal,
    getCartTotal,
    getDeliveryFee,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee('standard');
  const total = getCartTotal();

  const freeShippingThreshold = BRAND_CONFIG.freeShippingThreshold;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponFeedback({ type: 'success', message: res.message });
      setCouponInput('');
    } else {
      setCouponFeedback({ type: 'error', message: res.message });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-36 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream-50">
        <div className="w-20 h-20 rounded-full bg-cream-100 flex items-center justify-center text-4xl mb-4 shadow-soft-sm">
          🧁
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal mb-2">
          Your basket is empty
        </h1>
        <p className="text-chocolate-600 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
          Looks like you haven't added any sweet cravings yet. Explore our fresh batches!
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
        
        {/* Title */}
        <div className="mb-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-xs text-chocolate-500 hover:text-chocolate-900 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </Link>
          <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal">
            Shopping Basket
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Items Table / List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
            {/* Free Shipping Meter */}
            <div className="bg-caramel-50 p-4 rounded-2xl border border-caramel-200/80 mb-6 text-xs text-chocolate-800">
              <div className="flex items-center justify-between font-semibold mb-2">
                <span>
                  {amountNeeded === 0
                    ? '🎉 You have qualified for FREE Bakery Shipping!'
                    : `Add ₹${amountNeeded} more to get FREE Delivery`}
                </span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-caramel-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-caramel-500 transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="divide-y divide-cream-100">
              {cartItems.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="py-5 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-20 h-20 rounded-2xl overflow-hidden bg-cream-100 shrink-0 border border-cream-200"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-caramel-600">
                        {product.category}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="font-serif text-base sm:text-lg font-medium text-chocolate-900 block hover:text-caramel-600 transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="text-xs text-chocolate-500 mt-0.5">
                        ₹{product.price} each {product.weight ? `• ${product.weight}` : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto gap-6 ml-auto">
                    <QuantitySelector
                      quantity={quantity}
                      onIncrease={() => increaseQuantity(product.id)}
                      onDecrease={() => decreaseQuantity(product.id)}
                      size="sm"
                    />

                    <span className="font-semibold text-base text-chocolate-900 w-16 text-right">
                      ₹{product.price * quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      aria-label="Remove item"
                      className="p-2 text-chocolate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6">
            <h2 className="font-serif text-xl font-semibold text-chocolate-900 pb-3 border-b border-cream-100">
              Order Summary
            </h2>

            {/* Line items */}
            <div className="space-y-3 text-sm text-chocolate-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-chocolate-900">₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium text-chocolate-900">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-semibold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>

              {appliedCoupon && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <div className="flex items-center gap-1">
                    <span>Discount ({appliedCoupon.code})</span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs underline text-rose-600 ml-1"
                    >
                      Remove
                    </button>
                  </div>
                  <span>-₹{appliedCoupon.discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-cream-100 flex justify-between text-base font-bold text-chocolate-950">
                <span>Total</span>
                <span className="text-xl">₹{total}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="pt-2">
              <label className="text-xs font-semibold text-chocolate-700 block mb-1.5">
                Have a coupon code?
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. RASOOL10 or SWEETBOX"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                  className="flex-1 px-4 py-2.5 rounded-full bg-cream-50 border border-cream-300 text-xs text-chocolate-900 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-caramel-500"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>

              {couponFeedback.type && (
                <div
                  className={`mt-2 text-xs flex items-center gap-1.5 ${
                    couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                  }`}
                >
                  {couponFeedback.type === 'success' ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : (
                    <AlertCircle className="w-3.5 h-3.5" />
                  )}
                  <span>{couponFeedback.message}</span>
                </div>
              )}

              {/* Coupon hints */}
              <div className="mt-3 text-[11px] text-chocolate-500 flex flex-wrap gap-2">
                <span>Try:</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('RASOOL10')}
                  className="underline hover:text-caramel-600 font-medium"
                >
                  RASOOL10 (10% off)
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => applyCoupon('SWEETBOX')}
                  className="underline hover:text-caramel-600 font-medium"
                >
                  SWEETBOX (₹150 off)
                </button>
              </div>
            </form>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="w-full py-4 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold tracking-wider uppercase transition-all shadow-soft active:scale-98 flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-[11px] text-chocolate-400 text-center">
              Freshly packed in insulated thermal boxes with cold packs.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
