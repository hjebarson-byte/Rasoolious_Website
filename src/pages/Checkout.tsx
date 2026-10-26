import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  QrCode, 
  Banknote, 
  Truck, 
  Clock, 
  Store,
  Lock
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { BRAND_CONFIG } from '../config/brand';
import type { CustomerInfo } from '../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    getCartSubtotal,
    getDeliveryFee,
    appliedCoupon,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<CustomerInfo>({
    fullName: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98200 12345',
    address: '402, Sea Green Apartments, Perry Cross Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    deliveryOption: 'standard',
    paymentMethod: 'upi',
    notes: 'Please ring the doorbell and leave in cooling bag if away.',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getCartSubtotal();
  const deliveryFee = getDeliveryFee(formData.deliveryOption);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  if (cartItems.length === 0) {
    return (
      <div className="pt-36 pb-20 text-center max-w-md mx-auto px-4 min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="font-serif text-3xl text-chocolate-950 mb-3">
          Your basket is empty
        </h2>
        <p className="text-sm text-chocolate-600 mb-6">
          Add some fresh bakes before heading to checkout.
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold hover:bg-caramel-600 transition-colors uppercase tracking-wider"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `MC${Math.floor(10000 + Math.random() * 90000)}`;
      const orderSummary = {
        id: orderId,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        items: cartItems,
        total,
        customer: formData,
      };

      try {
        sessionStorage.setItem('last_order', JSON.stringify(orderSummary));
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1200);
  };

  return (
    <div className="pt-28 pb-20 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        
        {/* Navigation */}
        <div className="mb-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-xs text-chocolate-500 hover:text-chocolate-900 transition-colors mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Basket</span>
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal">
              Fresh Bake Checkout
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-medium">
              <Lock className="w-3 h-3" />
              <span>256-Bit SSL Encrypted</span>
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT: Customer Details & Preferences */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* 1. Contact Information */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-chocolate-900 mb-4 pb-3 border-b border-cream-100 flex items-center justify-between">
                  <span>1. Contact Details</span>
                  <span className="text-xs font-sans text-chocolate-400 font-normal">For order status SMS & dispatch updates</span>
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                    />
                    {errors.fullName && <p className="text-rose-600 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                    />
                    {errors.phone && <p className="text-rose-600 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                    />
                    {errors.email && <p className="text-rose-600 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>
              </div>

              {/* 2. Delivery Address */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-chocolate-900 mb-4 pb-3 border-b border-cream-100">
                  2. Delivery Address
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                      Street Address & Apartment *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                    />
                    {errors.address && <p className="text-rose-600 text-xs mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                      />
                      {errors.city && <p className="text-rose-600 text-xs mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                        Pincode *
                      </label>
                      <input
                        type="text"
                        value={formData.pincode}
                        onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                      />
                      {errors.pincode && <p className="text-rose-600 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-chocolate-700 block mb-1">
                      Delivery Instructions or Gift Note (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl bg-cream-50 border border-cream-300 text-sm focus:outline-none focus:ring-2 focus:ring-caramel-500"
                    />
                  </div>
                </div>
              </div>

              {/* 3. Delivery Method */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-chocolate-900 mb-4 pb-3 border-b border-cream-100">
                  3. Delivery Speed
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      id: 'standard',
                      title: 'Standard Delivery',
                      desc: 'Fresh batch next morning',
                      price: subtotal >= BRAND_CONFIG.freeShippingThreshold ? 'FREE' : '₹60',
                      icon: Truck,
                    },
                    {
                      id: 'express',
                      title: 'Express Courier',
                      desc: 'Delivered in 2–3 hours',
                      price: '₹120',
                      icon: Clock,
                    },
                    {
                      id: 'pickup',
                      title: 'Studio Pickup',
                      desc: 'Ready at Bandra Studio',
                      price: 'FREE',
                      icon: Store,
                    },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = formData.deliveryOption === opt.id;
                    return (
                      <div
                        key={opt.id}
                        onClick={() =>
                          setFormData({ ...formData, deliveryOption: opt.id as any })
                        }
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-chocolate-900 bg-caramel-50/50 shadow-soft-sm'
                            : 'border-cream-200 hover:border-cream-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <Icon className={`w-5 h-5 ${isSelected ? 'text-caramel-600' : 'text-chocolate-400'}`} />
                          <span className="font-bold text-xs text-chocolate-900">{opt.price}</span>
                        </div>
                        <h4 className="font-semibold text-sm text-chocolate-900">{opt.title}</h4>
                        <p className="text-[11px] text-chocolate-500 mt-0.5">{opt.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Payment Selection */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft">
                <h2 className="font-serif text-xl font-semibold text-chocolate-900 mb-4 pb-3 border-b border-cream-100">
                  4. Payment Method
                </h2>

                <div className="space-y-3">
                  {[
                    {
                      id: 'upi',
                      title: 'Instant UPI (Google Pay, PhonePe, Paytm, QR)',
                      desc: 'Scan QR or enter VPA for instant zero-fee verification',
                      icon: QrCode,
                    },
                    {
                      id: 'card',
                      title: 'Credit / Debit Card',
                      desc: 'Visa, Mastercard, RuPay & American Express accepted',
                      icon: CreditCard,
                    },
                    {
                      id: 'cod',
                      title: 'Cash on Fresh Delivery',
                      desc: 'Pay cash or UPI upon package handover at your doorstep',
                      icon: Banknote,
                    },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = formData.paymentMethod === p.id;
                    return (
                      <label
                        key={p.id}
                        className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          isSelected
                            ? 'border-chocolate-900 bg-caramel-50/40'
                            : 'border-cream-200 hover:border-cream-300 bg-white'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={p.id}
                          checked={isSelected}
                          onChange={() =>
                            setFormData({ ...formData, paymentMethod: p.id as any })
                          }
                          className="mt-1 accent-chocolate-900"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-caramel-600" />
                            <span className="font-semibold text-sm text-chocolate-900">
                              {p.title}
                            </span>
                          </div>
                          <p className="text-xs text-chocolate-500 mt-0.5">{p.desc}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT: Live Order Review & Place Order Button */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-cream-200 shadow-soft space-y-6 sticky top-28">
              <h3 className="font-serif text-xl font-semibold text-chocolate-900 pb-3 border-b border-cream-100">
                Your Fresh Treats ({cartItems.length})
              </h3>

              {/* Mini item list */}
              <div className="max-h-60 overflow-y-auto divide-y divide-cream-100 pr-1 space-y-2">
                {cartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-2 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover bg-cream-100 border border-cream-200"
                      />
                      <div>
                        <span className="font-medium text-chocolate-900 block truncate max-w-[140px]">
                          {product.name}
                        </span>
                        <span className="text-chocolate-400">Qty: {quantity}</span>
                      </div>
                    </div>
                    <span className="font-semibold text-chocolate-900">
                      ₹{product.price * quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Total calculations */}
              <div className="space-y-2.5 text-xs text-chocolate-700 pt-2 border-t border-cream-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-chocolate-900">₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-chocolate-900">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{appliedCoupon.discount}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-cream-200 flex justify-between text-sm font-bold text-chocolate-950">
                  <span>Grand Total</span>
                  <span className="text-xl">₹{total}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-all shadow-soft active:scale-98 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Securing Your Fresh Batch...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Place Order • ₹{total}</span>
                  </>
                )}
              </button>

              <div className="text-[11px] text-chocolate-400 text-center space-y-1">
                <p>Protected by 256-bit encryption.</p>
                <p>Fresh baked-to-order cancellation policy applies.</p>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
