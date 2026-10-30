import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { BRAND_CONFIG } from '../../config/brand';
import { 
  getCustomerWhatsAppUrl, 
  getOwnerWhatsAppOrderSlip, 
  getOwnerDailySummaryWhatsAppUrl 
} from '../utils/whatsapp';
import type { Order } from '../types/adminTypes';

export const OverviewScreen: React.FC = () => {
  const { 
    orders, 
    products,
    setCurrentScreen, 
    openModal, 
    openOrderDrawer,
    advanceOrderStatus,
    showToast
  } = useAdmin();

  const isPending = (status: Order['status']) => status !== 'completed' && status !== 'cancelled';

  // Metrics
  const todayRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const pendingOrders = orders.filter(o => isPending(o.status));
  const deliveredOrders = orders.filter(o => o.status === 'completed');
  const totalItemsSold = orders.reduce((sum, ord) => {
    return sum + ord.items.reduce((itemSum, item) => itemSum + item.quantity, 0);
  }, 0);

  // Formatted date
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  const handleSendDailyWhatsAppSummary = () => {
    const url = getOwnerDailySummaryWhatsAppUrl(orders, formattedDate);
    window.open(url, '_blank');
    showToast('Opening WhatsApp with daily dispatch summary', 'info');
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-body text-espresso">
      
      {/* Welcome Banner Block */}
      <div className="card-artisan p-6 sm:p-7 relative overflow-hidden bg-gradient-to-r from-white via-white to-[#FBF8F3]">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-caramel/15 via-secondary/10 to-transparent blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-secondary text-[11px] font-bold uppercase tracking-widest mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-caramel"></span>
              <span>Kanniyakumari Atelier · Bakery Operations</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl font-bold text-espresso tracking-tight">
              Welcome, Chef Rasool
            </h1>
            <p className="text-xs sm:text-sm text-secondary font-medium mt-1">
              Here is your daily order summary and instant WhatsApp dispatch controls.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-warm-cream/90 border border-border text-espresso text-xs font-bold shadow-warm-sm">
              <span className="material-symbols-outlined text-[17px] text-caramel">calendar_today</span>
              <span>{formattedDate}</span>
            </div>
            <button
              onClick={() => openModal('newOrder')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-espresso transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>New Order</span>
            </button>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-caramel text-white font-bold text-xs shadow-sm hover:bg-caramel-600 transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Orders Inbox ({pendingOrders.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="card-artisan p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Today's Sales</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                ₹{todayRevenue ? todayRevenue.toLocaleString('en-IN') : '0'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Across all online orders</span>
            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              UPI &amp; Gateway
            </span>
          </div>
        </div>

        {/* Card 2: Pending Orders */}
        <div className="card-artisan p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Pending Delivery</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                {pendingOrders.length} <span className="text-sm font-semibold text-amber-700">Orders</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <span className="material-symbols-outlined text-[20px]">schedule</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Ready for packing &amp; dispatch</span>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="text-[11px] font-bold text-caramel hover:underline"
            >
              View pending →
            </button>
          </div>
        </div>

        {/* Card 3: Delivered Orders */}
        <div className="card-artisan p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Delivered</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                {deliveredOrders.length} <span className="text-sm font-semibold text-emerald-700">Orders</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Fulfilled successfully</span>
            <span className="text-[11px] font-bold text-emerald-700">100% On Time</span>
          </div>
        </div>

        {/* Card 4: Total Brownies Ordered */}
        <div className="card-artisan p-5 flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Brownies Sold</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                {totalItemsSold} <span className="text-sm font-semibold text-secondary">Units</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-secondary font-medium">Slabs &amp; Gift Boxes</span>
            <button
              onClick={() => setCurrentScreen('inventory')}
              className="text-[11px] font-bold text-caramel hover:underline"
            >
              Check stock →
            </button>
          </div>
        </div>
      </div>

      {/* Bakery Owner WhatsApp Dispatch Notification Hub */}
      <div className="card-artisan p-5 bg-gradient-to-r from-[#25D366]/10 via-[#25D366]/5 to-transparent border border-[#25D366]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[24px]">chat</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-chocolate-950">
                Bakery Owner WhatsApp Alerts Active
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#25D366]/20 text-[#128C7E]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse"></span>
                Connected: {BRAND_CONFIG.contact.phone}
              </span>
            </div>
            <p className="text-xs text-chocolate-700 mt-0.5">
              Every website checkout triggers direct WhatsApp order slips with full address, phone, and items.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleSendDailyWhatsAppSummary}
            type="button"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">send</span>
            <span>Send Today's Summary to WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Recent Orders Table (8 cols) + Brownie Stock & Menu (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Recent Orders Table */}
        <div className="lg:col-span-8 card-artisan p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div>
              <h2 className="font-headline text-lg sm:text-xl font-bold text-espresso">Recent Orders</h2>
              <p className="text-xs text-secondary font-medium">Quick dispatch &amp; direct WhatsApp messaging</p>
            </div>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="px-3 py-1.5 rounded-xl bg-warm-cream border border-border text-espresso text-xs font-bold hover:bg-white transition-all shadow-warm-sm"
            >
              View All ({orders.length})
            </button>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-secondary text-[11px] font-extrabold uppercase tracking-wider border-y border-border">
                  <th className="py-3 px-4 pl-6">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Items</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.slice(0, 7).map((order) => {
                  const totalItemsCount = order.items.reduce((s, it) => s + it.quantity, 0);
                  const firstItemName = order.items[0]?.name || 'Brownie';
                  const shortName = firstItemName.replace('Brownie Slab', '').replace('Brownie', '').trim();
                  const orderPending = isPending(order.status);

                  return (
                    <tr key={order.id} className="hover:bg-surface/70 transition-colors">
                      <td className="py-3.5 px-4 pl-6 font-bold text-xs text-primary font-mono">
                        {order.id}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-espresso">{order.customerName}</span>
                          <span className="text-[11px] text-secondary font-medium">{order.phone}</span>
                          <span className="text-[10px] text-secondary/80 truncate max-w-[150px]">{order.locality}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-espresso">
                        <span className="font-bold text-primary">{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
                        <div className="text-[11px] text-secondary truncate max-w-[120px]">{shortName}</div>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-extrabold text-espresso">
                        ₹{order.total}
                      </td>
                      <td className="py-3.5 px-4">
                        {orderPending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>Pending</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                            <span>Delivered</span>
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Chat Customer on WhatsApp */}
                          <a
                            href={getCustomerWhatsAppUrl(order.phone, order.id, order.customerName)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#128C7E] transition-colors border border-emerald-200/60"
                            title="Chat with Customer on WhatsApp"
                          >
                            <span className="material-symbols-outlined text-[16px]">chat</span>
                          </a>

                          {/* Send Slip to Owner WhatsApp */}
                          <a
                            href={getOwnerWhatsAppOrderSlip(order)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] transition-colors border border-[#25D366]/30"
                            title="Send Order Slip to Owner WhatsApp"
                          >
                            <span className="material-symbols-outlined text-[16px]">send</span>
                          </a>

                          {/* Toggle Delivery */}
                          <button
                            onClick={() => advanceOrderStatus(order.id)}
                            className={`p-1.5 rounded-lg transition-colors border ${
                              orderPending
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-200'
                                : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                            }`}
                            title={orderPending ? 'Mark as Delivered' : 'Mark as Pending'}
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[16px]">
                              {orderPending ? 'check' : 'undo'}
                            </span>
                          </button>

                          {/* Drawer details */}
                          <button
                            onClick={() => openOrderDrawer(order)}
                            className="px-2.5 py-1 rounded-lg bg-warm-cream border border-border text-espresso text-[11px] font-bold hover:bg-white transition-colors"
                            type="button"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Brownie Menu & Stock Card */}
        <div className="lg:col-span-4 card-artisan p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-caramel">cake</span>
              <h3 className="font-headline text-lg font-bold text-espresso">Brownies &amp; Stock</h3>
            </div>
            <button
              onClick={() => setCurrentScreen('inventory')}
              className="text-xs font-bold text-caramel hover:underline"
            >
              Manage →
            </button>
          </div>

          <p className="text-xs text-secondary">
            Our 5 signature flavours and gift box currently active on the storefront.
          </p>

          <div className="flex flex-col divide-y divide-border/60">
            {products.slice(0, 6).map((product) => {
              const isLimited = product.status === 'Limited Stock';
              return (
                <div key={product.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-9 h-9 rounded-lg object-cover shrink-0 border border-border" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-espresso truncate">{product.name}</span>
                      <span className="text-[11px] text-secondary font-medium">₹{product.salePrice || product.price}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full shrink-0 ${
                    isLimited
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {product.status}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentScreen('inventory')}
            className="w-full mt-2 py-2.5 px-4 rounded-xl bg-warm-cream hover:bg-white text-espresso border border-border text-xs font-bold transition-colors shadow-warm-sm flex items-center justify-center gap-2"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px]">edit_note</span>
            <span>Update Pricing &amp; Daily Limits</span>
          </button>
        </div>

      </div>

    </div>
  );
};
