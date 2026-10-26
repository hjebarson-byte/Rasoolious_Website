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
  Flame, 
  CheckCircle2, 
  Truck, 
  Snowflake, 
  Receipt,
  ArrowRight
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { OrderStatus } from '../types/adminTypes';

export const OrderDrawer: React.FC = () => {
  const { 
    selectedOrder, 
    closeOrderDrawer, 
    updateOrderStatus, 
    advanceOrderStatus, 
    openModal,
    showToast
  } = useAdmin();

  if (!selectedOrder) return null;

  const statusConfig: Record<OrderStatus, { label: string; bg: string; text: string; icon: any }> = {
    received: { label: 'Received', bg: 'bg-chocolate-800 text-caramel-300', text: 'text-caramel-400', icon: Receipt },
    oven: { label: 'In the Oven', bg: 'bg-amber-500/20 text-amber-300', text: 'text-amber-400', icon: Flame },
    cooling: { label: 'Cooling & Slicing', bg: 'bg-sky-500/20 text-sky-300', text: 'text-sky-400', icon: Snowflake },
    delivery: { label: 'Out for Delivery', bg: 'bg-purple-500/20 text-purple-300', text: 'text-purple-400', icon: Truck },
    completed: { label: 'Completed', bg: 'bg-emerald-500/20 text-emerald-300', text: 'text-emerald-400', icon: CheckCircle2 }
  };

  const currStatus = statusConfig[selectedOrder.status];
  const StatusIcon = currStatus.icon;

  const handlePrintSlip = () => {
    window.print();
    showToast(`Printed kitchen packaging slip for ${selectedOrder.id}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={closeOrderDrawer} 
        className="absolute inset-0 bg-chocolate-950/70 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-chocolate-950 text-cream-50 border-l border-chocolate-800 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-chocolate-800/80 bg-chocolate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-chocolate-800 text-caramel-400">
                <StatusIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-lg text-cream-50">
                    Order #{selectedOrder.id}
                  </h3>
                  <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${currStatus.bg}`}>
                    {currStatus.label}
                  </span>
                </div>
                <p className="text-xs text-chocolate-400">
                  {selectedOrder.date} • {selectedOrder.slot}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintSlip}
                className="p-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-200 transition-colors"
                title="Print Kitchen Slip"
              >
                <Printer className="w-4 h-4 text-caramel-400" />
              </button>
              <button
                onClick={closeOrderDrawer}
                className="p-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-xs">
            
            {/* Quick Status Pipeline Controls */}
            <div className="bg-chocolate-900/80 border border-chocolate-800 rounded-2xl p-4 space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-400">
                Baking & Dispatch Pipeline
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {(['received', 'oven', 'cooling', 'delivery', 'completed'] as OrderStatus[]).map((st) => {
                  const isCurrent = selectedOrder.status === st;
                  const stInfo = statusConfig[st];
                  return (
                    <button
                      key={st}
                      onClick={() => updateOrderStatus(selectedOrder.id, st)}
                      className={`px-2 py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center justify-center gap-1 ${
                        isCurrent
                          ? 'bg-gradient-to-br from-caramel-400 to-caramel-600 text-chocolate-950 shadow-md font-extrabold ring-2 ring-caramel-300/50'
                          : 'bg-chocolate-950/70 hover:bg-chocolate-800 text-chocolate-300'
                      }`}
                    >
                      <span>{stInfo.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              {selectedOrder.status !== 'completed' && (
                <button
                  onClick={() => advanceOrderStatus(selectedOrder.id)}
                  className="w-full mt-2 py-2 px-3 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <span>Advance to Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Customer Details & Actions */}
            <div className="bg-chocolate-900/50 border border-chocolate-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-cream-50">{selectedOrder.customerName}</h4>
                  <span className="text-chocolate-400">{selectedOrder.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${selectedOrder.phone.replace(/[^0-9+]/g, '')}`}
                    className="p-2 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-caramel-300 flex items-center gap-1.5 transition-colors"
                    title="Call Customer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">Call</span>
                  </a>
                  <a
                    href={`https://wa.me/${selectedOrder.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-700/50 text-emerald-300 flex items-center gap-1.5 transition-colors"
                    title="WhatsApp Customer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span className="text-[11px] font-semibold">WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Delivery Destination */}
              <div className="pt-2 border-t border-chocolate-800/60 space-y-2">
                <div className="flex items-start gap-2 text-chocolate-300">
                  <MapPin className="w-4 h-4 text-caramel-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-cream-100">
                      {selectedOrder.locality} • PIN: {selectedOrder.pincode}
                    </div>
                    <p className="text-[11px] text-chocolate-400 leading-relaxed mt-0.5">
                      {selectedOrder.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-chocolate-300 pt-1">
                  <Clock className="w-4 h-4 text-caramel-400 shrink-0" />
                  <span>Delivery Window: <strong className="text-cream-100">{selectedOrder.slot}</strong></span>
                </div>
              </div>

              {/* Payment Details */}
              <div className="pt-2 border-t border-chocolate-800/60 flex items-center justify-between text-chocolate-300">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-caramel-400 shrink-0" />
                  <span>
                    {selectedOrder.paymentMethod} • <strong className="text-cream-100">{selectedOrder.paymentStatus}</strong>
                  </span>
                </div>
                <span className="font-mono text-[10px] text-chocolate-400">{selectedOrder.paymentRef}</span>
              </div>
            </div>

            {/* Bakery Items List */}
            <div className="bg-chocolate-900/50 border border-chocolate-800 rounded-2xl p-4 space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-400">
                Ordered Confections ({selectedOrder.items.length})
              </span>
              <div className="divide-y divide-chocolate-800/60">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="py-2.5 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-cream-50 text-xs">{item.name}</div>
                      <div className="text-[11px] text-chocolate-400">
                        {item.quantity} × ₹{item.unitPrice} • <span className="text-chocolate-300">{item.weight}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-cream-100 text-xs">
                      ₹{item.totalPrice}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Breakdown */}
              <div className="pt-3 border-t border-chocolate-800/80 space-y-1.5 text-xs text-chocolate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{selectedOrder.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kanniyakumari Delivery Fee</span>
                  <span className="font-mono">
                    {selectedOrder.deliveryFee === 0 ? (
                      <span className="text-emerald-400 font-semibold">FREE</span>
                    ) : (
                      `₹${selectedOrder.deliveryFee}`
                    )}
                  </span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Celebration Discount</span>
                    <span className="font-mono">-₹{selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-cream-50 pt-2 border-t border-chocolate-800">
                  <span>Total Amount</span>
                  <span className="font-mono text-caramel-300 text-base">₹{selectedOrder.total}</span>
                </div>
              </div>
            </div>

            {/* Gift Message Card (if applicable) */}
            {selectedOrder.hasGiftMessage && selectedOrder.giftMessage && (
              <div className="bg-gradient-to-br from-chocolate-900 to-chocolate-950 border border-caramel-500/40 rounded-2xl p-4 space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-caramel-300 font-serif font-bold text-sm">
                    <Gift className="w-4 h-4 text-caramel-400" />
                    <span>Personalized Handwritten Gift Card</span>
                  </div>
                  <button
                    onClick={() => openModal('printGiftCard', selectedOrder)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs transition-colors shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Card</span>
                  </button>
                </div>

                <div className="bg-cream-100 text-chocolate-900 rounded-xl p-3.5 shadow-inner border border-caramel-300/40 font-serif italic text-xs leading-relaxed space-y-1.5">
                  <div className="font-sans not-italic font-bold text-[11px] text-chocolate-600 flex justify-between">
                    <span>To: {selectedOrder.giftMessage.to}</span>
                    <span>From: {selectedOrder.giftMessage.from}</span>
                  </div>
                  <p className="pt-1 text-chocolate-900 font-medium">
                    "{selectedOrder.giftMessage.message}"
                  </p>
                </div>
              </div>
            )}

            {/* Customer Notes */}
            {selectedOrder.notes && (
              <div className="bg-chocolate-900/40 border border-chocolate-800 rounded-2xl p-3.5">
                <span className="block text-[11px] font-bold text-caramel-400 uppercase tracking-wider mb-1">
                  Baker & Kitchen Instructions
                </span>
                <p className="text-chocolate-200 text-xs italic">
                  "{selectedOrder.notes}"
                </p>
              </div>
            )}

            {/* Order Timeline */}
            <div className="bg-chocolate-900/50 border border-chocolate-800 rounded-2xl p-4 space-y-3">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-caramel-400">
                Live Audit & Kitchen Timeline
              </span>
              <div className="space-y-3 relative pl-4 border-l border-chocolate-800">
                {selectedOrder.timeline.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-caramel-400 ring-4 ring-chocolate-950" />
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-cream-100">{item.title}</span>
                      <span className="text-[10px] font-mono text-chocolate-400">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-chocolate-300 mt-0.5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Drawer Footer */}
          <div className="p-4 border-t border-chocolate-800/80 bg-chocolate-900/80 flex items-center justify-between gap-3">
            <button
              onClick={closeOrderDrawer}
              className="flex-1 py-2 px-3 rounded-xl bg-chocolate-800 hover:bg-chocolate-700 text-cream-100 font-semibold text-xs transition-colors"
            >
              Close Drawer
            </button>
            <button
              onClick={handlePrintSlip}
              className="flex-1 py-2 px-3 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
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
