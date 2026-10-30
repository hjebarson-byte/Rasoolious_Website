import React from 'react';
import { 
  Search, 
  MapPin, 
  Eye, 
  Gift, 
  RefreshCw, 
  CheckCircle2, 
  Clock, 
  MessageSquare,
  Send
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { getCustomerWhatsAppUrl, getOwnerWhatsAppOrderSlip } from '../utils/whatsapp';

export const KitchenOrdersScreen: React.FC = () => {
  const { 
    orders, 
    orderFilters, 
    setOrderFilters, 
    openOrderDrawer, 
    advanceOrderStatus, 
    openModal, 
    showToast 
  } = useAdmin();

  const isOrderPending = (status: string) => status !== 'completed' && status !== 'cancelled';

  const statusList = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending Delivery' },
    { id: 'completed', label: 'Delivered' }
  ];

  // Filtering logic
  const filteredOrders = orders.filter(ord => {
    // Search
    if (orderFilters.search) {
      const q = orderFilters.search.toLowerCase();
      const match =
        ord.id.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.locality.toLowerCase().includes(q) ||
        ord.phone.includes(q) ||
        ord.items.some(i => i.name.toLowerCase().includes(q));
      if (!match) return false;
    }

    // Status filter
    if (orderFilters.status !== 'all') {
      if (orderFilters.status === 'pending') {
        if (!isOrderPending(ord.status)) return false;
      } else if (orderFilters.status === 'completed') {
        if (ord.status !== 'completed') return false;
      }
    }

    // Payment filter
    if (orderFilters.payment !== 'all' && ord.paymentMethod !== orderFilters.payment) {
      return false;
    }

    return true;
  });

  const pendingCount = orders.filter(o => isOrderPending(o.status)).length;
  const deliveredCount = orders.filter(o => o.status === 'completed').length;

  return (
    <div className="space-y-6">
      
      {/* Screen Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            Orders & Delivery Inbox
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Review incoming customer orders, send instant WhatsApp updates, and manage dispatches across Kanniyakumari.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Orders list refreshed', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-chocolate-800 font-semibold text-xs border border-stone-200 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-caramel-600" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Status Stage Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {statusList.map(tab => {
            const count = tab.id === 'all' 
              ? orders.length 
              : tab.id === 'pending'
              ? pendingCount
              : deliveredCount;
            const isActive = orderFilters.status === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setOrderFilters(prev => ({ ...prev, status: tab.id }))}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-chocolate-900 text-white shadow-sm font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                  isActive ? 'bg-caramel-500 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          {/* Search */}
          <div className="relative sm:col-span-2">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderFilters.search}
              onChange={e => setOrderFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search by order ID, customer name, phone, locality, treats..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2 text-chocolate-900 placeholder:text-stone-400 focus:bg-white focus:border-caramel-500 focus:outline-none"
            />
          </div>

          {/* Payment filter */}
          <div>
            <select
              value={orderFilters.payment}
              onChange={e => setOrderFilters(prev => ({ ...prev, payment: e.target.value }))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-chocolate-900 focus:bg-white focus:border-caramel-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Payment Methods</option>
              <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>

        </div>

        {/* Reset Filters */}
        {(orderFilters.search || orderFilters.status !== 'all' || orderFilters.payment !== 'all') && (
          <div className="pt-1">
            <button
              onClick={() => setOrderFilters({ search: '', status: 'all', slot: 'all', payment: 'all' })}
              className="text-xs text-caramel-700 font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* Orders Table & Cards */}
      <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs">
        
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-sm space-y-2">
            <p className="font-semibold text-chocolate-900">No orders found</p>
            <p className="text-xs">Try adjusting your search or status filter above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider bg-stone-50/70">
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">ORDER</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">CUSTOMER</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">DESTINATION</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">TREATS & ITEMS</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">PAYMENT</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">TOTAL</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">DELIVERY</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900 text-right">WHATSAPP & ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map(order => {
                  const isDelivered = order.status === 'completed';

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-stone-50 transition-colors group cursor-pointer"
                      onClick={() => openOrderDrawer(order)}
                    >
                      {/* Order ID */}
                      <td className="py-3.5 px-4 font-mono font-bold text-caramel-700">
                        #{order.id}
                        {order.hasGiftMessage && (
                          <span className="block mt-0.5 text-[9px] text-caramel-600 font-sans font-semibold">
                            🎁 Gift Card
                          </span>
                        )}
                      </td>

                      {/* Customer */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-chocolate-950 group-hover:text-caramel-700 transition-colors">
                          {order.customerName}
                        </div>
                        <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                          {order.phone}
                        </div>
                      </td>

                      {/* Locality */}
                      <td className="py-3.5 px-4">
                        <div className="text-chocolate-900 font-medium flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-caramel-600 shrink-0" />
                          <span>{order.locality}</span>
                        </div>
                        <div className="text-[10px] text-stone-400">PIN: {order.pincode}</div>
                      </td>

                      {/* Items */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="text-chocolate-800 truncate font-medium">
                          {order.items.map(i => `${i.quantity}× ${i.name}`).join(', ')}
                        </div>
                        <div className="text-[10px] text-stone-400">
                          {order.items.reduce((s, i) => s + i.quantity, 0)} boxes total
                        </div>
                      </td>

                      {/* Payment */}
                      <td className="py-3.5 px-4">
                        <div className="text-chocolate-800 font-medium">{order.paymentMethod}</div>
                        <span className={`text-[10px] font-semibold ${
                          order.paymentMethod === 'COD' ? 'text-amber-700' : 'text-emerald-700'
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </td>

                      {/* Total */}
                      <td className="py-3.5 px-4 font-mono font-bold text-chocolate-950 text-sm">
                        ₹{order.total}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {isDelivered ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>DELIVERED</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-600" />
                            <span>PENDING</span>
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {/* WhatsApp Customer */}
                          <a
                            href={getCustomerWhatsAppUrl(order.phone, order.id, order.customerName)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors shadow-2xs"
                            title="Chat with Customer on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                          </a>

                          {/* WhatsApp Owner Order Slip */}
                          <a
                            href={getOwnerWhatsAppOrderSlip(order)}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-chocolate-800 border border-stone-200 transition-colors shadow-2xs"
                            title="Send WhatsApp Order Slip to Owner"
                          >
                            <Send className="w-3.5 h-3.5 text-caramel-600" />
                          </a>

                          {/* Toggle Delivered */}
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className={`p-1.5 rounded-lg transition-colors font-bold shadow-2xs ${
                              isDelivered
                                ? 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            }`}
                            title={isDelivered ? 'Re-open Order' : 'Mark as Delivered'}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>

                          {/* View Drawer */}
                          <button
                            onClick={() => openOrderDrawer(order)}
                            className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                            title="View Order Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Gift Card Print */}
                          {order.hasGiftMessage && (
                            <button
                              onClick={() => openModal('printGiftCard', order)}
                              className="p-1.5 rounded-lg bg-caramel-50 hover:bg-caramel-100 text-caramel-700 transition-colors border border-caramel-200"
                              title="Print Gift Card"
                            >
                              <Gift className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
