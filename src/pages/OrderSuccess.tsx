import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, Package, ArrowRight, Home, MessageSquare } from 'lucide-react';
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
          id: 'RAS1042',
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          total: 850,
          customer: {
            fullName: 'Ananya Sharma',
            phone: '9842188390',
            address: '402, Sea Green Apartments, Perry Cross Road',
            city: 'Nagercoil',
            pincode: '629001',
            deliveryOption: 'standard',
          },
          items: [
            { name: 'The Rasool (500g slab)', quantity: 1, price: 490 },
            { name: 'The Original (500g slab)', quantity: 1, price: 360 }
          ]
        });
      }
    } catch {
      // ignore
    }
  }, []);

  const getOwnerWhatsAppUrl = (ord: any) => {
    const rawPhone = BRAND_CONFIG.contact.phone || '9486518486';
    const cleanPhone = rawPhone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    const itemsSummary = ord.items && Array.isArray(ord.items)
      ? ord.items.map((i: any) => `• ${i.quantity}x ${i.name} - ₹${i.price * i.quantity}`).join('\n')
      : 'Signature Brownies';

    const customerInfo = ord.customer
      ? `👤 *Customer:* ${ord.customer.fullName}\n📞 *Phone:* ${ord.customer.phone || 'N/A'}\n📍 *Address:* ${ord.customer.address}, ${ord.customer.city} - ${ord.customer.pincode}`
      : '';

    const text = `🍫 *NEW ORDER CONFIRMATION - ${BRAND_CONFIG.name}*

📦 *Order ID:* #${ord.id}
${customerInfo}

🛒 *Items:*
${itemsSummary}

💰 *Total Amount:* ₹${ord.total}
🕒 *Date:* ${ord.date || new Date().toLocaleDateString('en-IN')}

_Please confirm my order preparation and delivery slot!_`;

    return `https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(text)}`;
  };

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

          {/* WhatsApp Owner Alert Block */}
          {order && (
            <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-2xl p-5 text-left space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs sm:text-sm text-chocolate-950">
                    Send Order Slip to Chef Rasool on WhatsApp
                  </h3>
                  <p className="text-[11px] text-chocolate-700">
                    Notify our bakery directly ({BRAND_CONFIG.contact.phone}) to get instant order confirmation on WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href={getOwnerWhatsAppUrl(order)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-soft flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send WhatsApp Order Confirmation to Bakery</span>
              </a>
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
