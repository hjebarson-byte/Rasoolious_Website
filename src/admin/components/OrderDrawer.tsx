import React from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  MapPin, 
  Clock, 
  CreditCard, 
  Gift, 
  Printer, 
  CheckCircle2, 
  Send
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { getCustomerWhatsAppUrl, getOwnerWhatsAppOrderSlip } from '../utils/whatsapp';

export const OrderDrawer: React.FC = () => {
  const { 
    selectedOrder, 
    closeOrderDrawer, 
    updateOrderStatus, 
    openModal,
    showToast
  } = useAdmin();

  if (!selectedOrder) return null;

  const isDelivered = selectedOrder.status === 'completed';

  const handlePrintSlip = () => {
    window.print();
    showToast(`Printed packaging slip for #${selectedOrder.id}`, 'info');
  };

  const handleToggleDelivered = () => {
    if (isDelivered) {
      updateOrderStatus(selectedOrder.id, 'pending');
    } else {
      updateOrderStatus(selectedOrder.id, 'completed');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeOrderDrawer} 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white text-chocolate-950 border-l border-stone-200 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 bg-stone-50/70 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border shadow-2xs ${
                isDelivered ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-amber-50 text-amber-600 border-amber-200'
              }`}>
                {isDelivered ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Clock className="w-5 h-5 text-amber-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-chocolate-950">
                    Order #{selectedOrder.id}
                  </h3>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                    isDelivered 
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {isDelivered ? 'DELIVERED' : 'PENDING'}
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {selectedOrder.date} • {selectedOrder.slot}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintSlip}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-2xs transition-colors"
                title="Print Order Packaging Slip"
              >
                <Printer className="w-4 h-4 text-caramel-600" />
              </button>
              <button
                onClick={closeOrderDrawer}
                className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-500 hover:text-stone-900 border border-stone-200 shadow-2xs transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs">
            
            {/* Quick Delivery Status Action Card */}
            <div className="bg-stone-50/90 border border-stone-200/90 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-700">
                  Order Status
                </span>
                <p className="text-xs text-stone-600 mt-0.5">
                  {isDelivered 
                    ? 'This order has been handed over and marked delivered.'
                    : 'Order confirmed and ready for packing & delivery.'}
                </p>
              </div>

              <button
                onClick={handleToggleDelivered}
                className={`w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xs shrink-0 ${
                  isDelivered
                    ? 'bg-stone-200 hover:bg-stone-300 text-stone-800'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isDelivered ? 'Mark as Pending' : 'Mark as Delivered'}</span>
              </button>
            </div>

            {/* Direct WhatsApp & Calling Actions */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-2xs">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-700">
                Customer Contact & WhatsApp Alerts
              </span>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                {/* 1. Chat with Customer on WhatsApp */}
                <a
                  href={getCustomerWhatsAppUrl(selectedOrder.phone, selectedOrder.id, selectedOrder.customerName)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center gap-2 transition-colors font-semibold shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat with Customer on WhatsApp</span>
                </a>

                {/* 2. Call Customer */}
                <a
                  href={`tel:${selectedOrder.phone.replace(/[^0-9+]/g, '')}`}
                  className="py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-chocolate-900 flex items-center justify-center gap-1.5 transition-colors font-semibold border border-stone-200"
                >
                  <Phone className="w-4 h-4 text-caramel-600" />
                  <span>Call</span>
                </a>
              </div>

              {/* 3. Send Order Slip to Owner WhatsApp */}
              <a
                href={getOwnerWhatsAppOrderSlip(selectedOrder)}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-chocolate-900 hover:bg-caramel-600 text-cream-50 flex items-center justify-center gap-2 transition-colors font-semibold text-xs shadow-xs"
              >
                <Send className="w-3.5 h-3.5 text-caramel-300" />
                <span>Send WhatsApp Order Slip to Owner Phone</span>
              </a>
            </div>

            {/* Customer Details & Delivery Destination */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-2xs">
              <div>
                <h4 className="font-bold text-sm text-chocolate-950">{selectedOrder.customerName}</h4>
                <span className="text-stone-500 font-mono text-xs">{selectedOrder.phone}</span>
              </div>

              {/* Delivery Destination */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <div className="flex items-start gap-2 text-stone-600">
                  <MapPin className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-chocolate-950">
                      {selectedOrder.locality} • PIN: {selectedOrder.pincode}
                    </div>
                    <p className="text-[11px] text-stone-500 leading-relaxed mt-0.5">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-stone-600 pt-1">
                  <Clock className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>Delivery Window: <strong className="text-chocolate-950">{selectedOrder.slot}</strong></span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-stone-600">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-caramel-600 shrink-0" />
                  <span>
                    {selectedOrder.paymentMethod} • <strong className="text-chocolate-950">{selectedOrder.paymentStatus}</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-stone-400">{selectedOrder.paymentRef}</span>
              </div>
            </div>

            {/* Bakery Items List */}
            <div className="bg-white border border-stone-200 rounded-2xl p-4 space-y-3 shadow-2xs">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-700">
                Ordered Confections ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-stone-100">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-chocolate-950 text-xs">{item.name}</div>
                      <div className="text-[11px] text-stone-500">
                        {item.quantity} × ₹{item.unitPrice} • <span className="text-stone-700 font-medium">{item.weight}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-chocolate-950 text-xs">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-chocolate-900 font-medium">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-mono">
                    {selectedOrder.deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE</span>
                    ) : (
                      `₹${selectedOrder.deliveryFee}`
                    )}
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount</span>
                    <span className="font-mono">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-chocolate-950 pt-2 border-t border-stone-200">
                  <span>Total Paid</span>
                  <span className="font-mono text-caramel-700 text-base">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Gift Message Card (if applicable) */}
            {selectedOrder.hasGiftMessage && selectedOrder.giftMessage && (
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-3 relative overflow-hidden shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-caramel-800 font-serif font-bold text-sm">
                    <Gift className="w-4 h-4 text-caramel-600" />
                    <span>Personalized Handwritten Gift Card</span>
                  </div>
                  <button
                    onClick={() => openModal('printGiftCard', selectedOrder)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs transition-colors shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>

                <div className="bg-white text-chocolate-900 rounded-xl p-3.5 shadow-2xs border border-amber-200 font-serif italic text-xs leading-relaxed space-y-1.5">
                  <div className="font-sans not-italic font-bold text-[11px] text-stone-600 flex justify-between">
                    <span>To: {selectedOrder.giftMessage.to}</span>
                    <span>From: {selectedOrder.giftMessage.from}</span>
                  </div>
                  <p className="pt-1 text-chocolate-950 font-medium">
                    "{selectedOrder.giftMessage.message}"
                  </p>
                </div>
              </div>
            )}

            {/* Customer Notes */}
            {selectedOrder.notes && (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-3.5">
                <span className="block text-[11px] font-bold text-caramel-700 uppercase tracking-wider mb-1">
                  Customer Instructions
                </span>
                <p className="text-stone-700 text-xs italic font-medium">
                  "{selectedOrder.notes}"
                </p>
              </div>
            )}

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-stone-200 bg-stone-50/70 flex items-center justify-between gap-3">
            <button
              onClick={closeOrderDrawer}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-stone-100 text-chocolate-900 border border-stone-200 font-semibold text-xs transition-colors shadow-2xs"
            >
              Close Drawer
            </button>
            <button
              onClick={handlePrintSlip}
              className="flex-1 py-2.5 px-3 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Packaging Slip</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
