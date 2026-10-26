import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Package, ArrowRight, Home } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';

export const OrderSuccess: React.FC = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      } else {
        // Fallback demo order if visited directly
        setOrder({
          id: 'MC10248',
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          total: 850,
          customer: {
            fullName: 'Ananya Sharma',
            address: '402, Sea Green Apartments, Perry Cross Road',
            city: 'Mumbai',
            pincode: '400050',
            deliveryOption: 'standard',
          },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="pt-32 pb-24 bg-cream-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        
        {/* Main Card */}
        <div className="bg-white rounded-4xl p-8 sm:p-12 border border-cream-200 shadow-card text-center space-y-6">
          
          {/* Animated checkmark icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto shadow-soft-sm">
            <CheckCircle2 className="w-10 h-10 animate-scale-in" />
          </div>

          <div>
            <span className="px-3.5 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-caramel-100 text-chocolate-800 inline-block mb-3">
              Order Confirmed
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal">
              Thank you for your order!
            </h1>
            <p className="text-chocolate-600 text-sm sm:text-base mt-2 max-w-md mx-auto leading-relaxed">
              Your treats are being prepared with love and lots of chocolate.
            </p>
          </div>

          {/* Order Details Badge */}
          {order && (
            <div className="bg-cream-50 rounded-2xl p-5 border border-cream-200 text-left text-xs space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-cream-200">
                <span className="text-chocolate-500">Order Reference</span>
                <span className="font-bold text-sm text-chocolate-950 font-mono">
                  #{order.id}
                </span>
              </div>

              <div className="flex items-start gap-2.5 text-chocolate-700">
                <Clock className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Estimated Delivery</span>
                  <span>Tomorrow between 9:00 AM – 1:00 PM</span>
                </div>
              </div>

              {order.customer && (
                <div className="flex items-start gap-2.5 text-chocolate-700 pt-1">
                  <MapPin className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-chocolate-900">Delivering To</span>
                    <span>
                      {order.customer.fullName}, {order.customer.address}, {order.customer.city} - {order.customer.pincode}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2.5 text-chocolate-700 pt-1">
                <Package className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-chocolate-900">Packaging</span>
                  <span>Custom thermal insulated box with dry cold pads</span>
                </div>
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/shop"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft flex items-center justify-center gap-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-cream-100 hover:bg-cream-200 text-chocolate-900 text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <p className="text-[11px] text-chocolate-400">
            A confirmation email and SMS dispatch link have been sent. For urgent modifications, call {BRAND_CONFIG.contact.phone}.
          </p>

        </div>

      </div>
    </div>
  );
};
