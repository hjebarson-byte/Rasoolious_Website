import React from 'react';
import { 
  Search, 
  MapPin, 
  Eye, 
  ArrowRight, 
  Gift, 
  RefreshCw 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { OrderStatus } from '../types/adminTypes';

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

  const statusList: { id: string; label: string }[] = [
    { id: 'all', label: 'All Orders' },
    { id: 'received', label: 'Received' },
    { id: 'oven', label: 'In Oven' },
    { id: 'cooling', label: 'Cooling & Slicing' },
    { id: 'delivery', label: 'Out for Delivery' },
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
    if (orderFilters.status !== 'all' && ord.status !== orderFilters.status) {
      return false;
    }

    // Slot filter
    if (orderFilters.slot !== 'all' && ord.slotId !== orderFilters.slot) {
      return false;
    }

    // Payment filter
    if (orderFilters.payment !== 'all' && ord.paymentMethod !== orderFilters.payment) {
      return false;
    }

    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'received':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">RECEIVED</span>;
      case 'oven':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">IN OVEN</span>;
      case 'cooling':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800 border border-sky-200">COOLING</span>;
      case 'delivery':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">DISPATCHED</span>;
      case 'completed':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">DELIVERED</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Screen Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            Live Kitchen Orders
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Manage every confection order from payment confirmation to hot oven and doorstep delivery.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => showToast('Kitchen orders queue refreshed', 'info')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-stone-50 text-chocolate-800 font-semibold text-xs border border-stone-200 transition-colors shadow-xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-caramel-600" />
            <span>Refresh Queue</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        
        {/* Status Stage Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {statusList.map(tab => {
            const count = tab.id === 'all' 
              ? orders.length 
              : orders.filter(o => o.status === tab.id).length;
            const isActive = orderFilters.status === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setOrderFilters(prev => ({ ...prev, status: tab.id }))}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-caramel-500 text-white shadow-sm font-bold'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/70'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-stone-200 text-stone-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={orderFilters.search}
              onChange={e => setOrderFilters(prev => ({ ...prev, search: e.target.value }))}
              placeholder="Search ID, customer, locality..."
              className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-9 pr-3.5 py-2 text-chocolate-900 placeholder:text-stone-400 focus:bg-white focus:border-caramel-500 focus:outline-none"
            />
          </div>

          {/* Slot filter */}
          <div>
            <select
              value={orderFilters.slot}
              onChange={e => setOrderFilters(prev => ({ ...prev, slot: e.target.value }))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-chocolate-900 focus:bg-white focus:border-caramel-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Delivery Slots</option>
              <option value="slot-morning">Morning Slot (9 AM–1 PM)</option>
              <option value="slot-afternoon">Afternoon Slot (1 PM–5 PM)</option>
              <option value="slot-evening">Evening Slot (5 PM–9 PM)</option>
            </select>
          </div>

          {/* Payment filter */}
          <div>
            <select
              value={orderFilters.payment}
              onChange={e => setOrderFilters(prev => ({ ...prev, payment: e.target.value }))}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-chocolate-900 focus:bg-white focus:border-caramel-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Payment Methods</option>
              <option value="UPI">UPI (GooglePay / PhonePe)</option>
              <option value="Card">Credit / Debit Card</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>

          {/* Clear Filters */}
          {(orderFilters.search || orderFilters.status !== 'all' || orderFilters.slot !== 'all' || orderFilters.payment !== 'all') && (
            <button
              onClick={() => setOrderFilters({ search: '', status: 'all', slot: 'all', payment: 'all' })}
              className="px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors font-medium"
            >
              Reset Filters
            </button>
          )}

        </div>

      </div>

      {/* Orders Table & Cards */}
      <div className="bg-white border border-stone-200/90 rounded-3xl overflow-hidden shadow-xs">
        
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-stone-400 text-sm space-y-2">
            <p className="font-semibold text-chocolate-900">No kitchen orders found</p>
            <p className="text-xs">Try adjusting your status or search filters above.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-stone-100 text-[10px] text-stone-400 uppercase tracking-wider bg-stone-50/70">
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">ORDER</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">CUSTOMER & LOCALITY</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">TREATS & ITEMS</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">SLOT</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">PAYMENT</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">TOTAL</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900">STATUS</th>
                  <th className="py-3.5 px-4 font-bold text-chocolate-900 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredOrders.map(order => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50 transition-colors group cursor-pointer"
                    onClick={() => openOrderDrawer(order)}
                  >
                    {/* Order ID */}
                    <td className="py-3.5 px-4 font-mono font-bold text-caramel-700">
                      #{order.id}
                      {order.hasGiftMessage && (
                        <span className="block mt-0.5 text-[9px] text-caramel-600 font-sans font-medium">
                          🎁 Gift Card
                        </span>
                      )}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-chocolate-950 group-hover:text-caramel-700 transition-colors">
                        {order.customerName}
                      </div>
                      <div className="text-[11px] text-stone-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-caramel-600" />
                        <span>{order.locality}</span>
                      </div>
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

                    {/* Slot */}
                    <td className="py-3.5 px-4">
                      <div className="text-chocolate-900 font-medium">{order.slot.split(',')[0]}</div>
                      <div className="text-[10px] text-stone-400">{order.slot.split(',')[1] || ''}</div>
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
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {order.status !== 'completed' && (
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className="p-1.5 rounded-lg bg-caramel-500 hover:bg-caramel-600 text-white font-bold transition-colors shadow-xs"
                            title="Advance to Next Stage"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}

                        <button
                          onClick={() => openOrderDrawer(order)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                          title="View Details Drawer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

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
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
