import React from 'react';
import { useAdmin } from '../context/AdminContext';
import type { Order } from '../types/adminTypes';

export const OverviewScreen: React.FC = () => {
  const { 
    orders, 
    setCurrentScreen, 
    openModal, 
    openOrderDrawer 
  } = useAdmin();

  // Dynamic calculations from context
  const todayRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const receivedCount = orders.filter(o => o.status === 'received').length;
  const inOvenCount = orders.filter(o => o.status === 'oven').length;
  const inCoolingCount = orders.filter(o => o.status === 'cooling').length;
  const readyDispatchCount = orders.filter(o => o.status === 'delivery').length;

  // Capacity calculations
  const dailyLimit = 60;
  const bakedCount = 42;
  const remainingCount = dailyLimit - bakedCount;
  const capacityPct = Math.round((bakedCount / dailyLimit) * 100);

  // Status badge helper
  const renderStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'oven':
        return (
          <span className="badge-artisan bg-[#FFDDB6] text-[#402600] border border-[#EAE2D8]">
            <span className="w-1.5 h-1.5 rounded-full bg-caramel mr-1.5"></span>
            <span>In Oven</span>
          </span>
        );
      case 'cooling':
        return (
          <span className="badge-artisan bg-[#FFDDB6] text-[#402600] border border-[#EAE2D8]">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
            <span>Cooling &amp; Slicing</span>
          </span>
        );
      case 'delivery':
        return (
          <span className="badge-artisan bg-warm-cream text-espresso border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5"></span>
            <span>Out for Delivery</span>
          </span>
        );
      case 'completed':
        return (
          <span className="badge-artisan bg-[#E5EFEA] text-[#1E5638] border border-[#C5DED0]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mr-1.5"></span>
            <span>Delivered</span>
          </span>
        );
      case 'received':
      default:
        return (
          <span className="badge-artisan bg-warm-cream text-espresso border border-border">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary mr-1.5"></span>
            <span>Confirmed</span>
          </span>
        );
    }
  };

  // Date display helper
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short'
  }).format(new Date());

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto font-body text-espresso">
      {/* Welcome Banner Block */}
      <div className="card-artisan p-7 relative overflow-hidden bg-gradient-to-r from-white via-white to-[#FBF8F3]">
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-gradient-to-br from-caramel/15 via-secondary/10 to-transparent blur-2xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 relative z-10">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-secondary text-[11px] font-bold uppercase tracking-widest mb-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-caramel"></span>
              <span>Kanniyakumari Artisan Atelier · Console 01</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold text-espresso tracking-tight">
              Good evening, Chef Rasool
            </h1>
            <p className="text-sm text-secondary font-medium mt-1">
              Here's what's happening in your atelier today.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-warm-cream/90 border border-border text-espresso text-xs font-bold shadow-warm-sm">
              <span className="material-symbols-outlined text-[17px] text-caramel">calendar_today</span>
              <span>{formattedDate} · Live Kitchen Feed</span>
            </div>
            <button
              onClick={() => openModal('newOrder')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm hover:bg-espresso transition-all active:scale-[0.98]"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>Create Manual Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Section A: KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="card-artisan p-5 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Today's Revenue</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                ₹{todayRevenue ? todayRevenue.toLocaleString('en-IN') : '24,850'}
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">currency_rupee</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-warm-cream border border-border text-espresso">
              <span className="material-symbols-outlined text-[13px] text-emerald-600 font-bold">trending_up</span>
              <span className="text-[11px] font-bold text-emerald-700">+14% vs yesterday</span>
            </div>
            {/* Sparkline Mini SVG */}
            <svg className="w-20 h-6 text-caramel" fill="none" viewBox="0 0 80 24">
              <path d="M2 18 L16 14 L30 17 L44 9 L58 12 L72 3 L78 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2"></path>
            </svg>
          </div>
        </div>

        {/* Card 2: Active Orders */}
        <div className="card-artisan p-5 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Active Kitchen Orders</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">{orders.length} Orders</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">restaurant</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center">
            <span className="px-2.5 py-1 rounded-full bg-[#FFDBCF]/80 text-[#5E3F38] text-[11px] font-bold truncate border border-[#F3C4B3]">
              {receivedCount} Received · {inOvenCount} In Oven · {inCoolingCount} Cooling
            </span>
          </div>
        </div>

        {/* Card 3: Brownie Slabs Baked */}
        <div className="card-artisan p-5 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">Brownie Slabs Baked Today</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">
                {bakedCount} / {dailyLimit} <span className="text-xs text-secondary font-medium">Slabs</span>
              </span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex flex-col gap-1.5">
            <div className="w-full bg-warm-cream h-2 rounded-full overflow-hidden border border-border/70">
              <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: `${capacityPct}%` }}></div>
            </div>
            <span className="text-[11px] font-semibold text-secondary">{capacityPct}% of daily capacity</span>
          </div>
        </div>

        {/* Card 4: Delivery Rate */}
        <div className="card-artisan p-5 flex flex-col justify-between group">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-secondary">On-Time Delivery Rate</span>
              <span className="text-2xl font-extrabold text-espresso mt-1 tracking-tight">98.2%</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-warm-cream border border-border flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
            <span className="text-xs text-secondary truncate font-medium">Across Kanniyakumari routes</span>
            <span className="text-[11px] font-bold text-emerald-700 flex-shrink-0 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+2.4%</span>
          </div>
        </div>
      </div>

      {/* Section B: Live Kitchen Pipeline */}
      <div className="card-artisan p-6 flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
          <div>
            <h2 className="font-headline text-xl font-bold text-espresso">Live Kitchen Pipeline</h2>
            <p className="text-xs text-secondary font-medium mt-0.5">Track today's orders from confirmation to dispatch.</p>
          </div>
          <button
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="inline-flex items-center gap-1 text-xs font-bold text-caramel hover:text-espresso transition-colors group"
          >
            <span>View Kitchen Board</span>
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
          </button>
        </div>

        {/* 4-stage interactive visual pipeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Stage 1 */}
          <div
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="bg-surface rounded-xl p-4 border border-border flex flex-col justify-between gap-4 hover:border-caramel/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-warm-cream border border-border flex items-center justify-center text-espresso text-xs font-bold">1</span>
              <span className="px-2.5 py-0.5 rounded-full bg-warm-cream border border-border text-secondary text-[11px] font-bold">
                {receivedCount} orders
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-secondary shadow-warm-sm">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
              </div>
              <div>
                <p className="text-sm font-bold text-espresso">Received</p>
                <p className="text-xs text-secondary">Ingredients weighed</p>
              </div>
            </div>
          </div>

          {/* Stage 2: Active In Oven */}
          <div
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="bg-primary rounded-xl p-4 border border-espresso text-white shadow-warm-md flex flex-col justify-between gap-4 relative overflow-hidden cursor-pointer"
          >
            <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-caramel/10 blur-xl pointer-events-none"></div>
            <div className="flex items-center justify-between relative z-10">
              <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-caramel text-xs font-bold">2</span>
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/25 text-[#FFDDB6] text-[11px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-caramel animate-ping"></span>
                <span>{inOvenCount} orders</span>
              </div>
            </div>
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-caramel shadow-inner">
                <span className="material-symbols-outlined text-[20px]">local_fire_department</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">In Oven</p>
                  <span className="px-1.5 py-0.5 rounded bg-black/30 text-caramel text-[9px] font-extrabold uppercase tracking-wider">Active Bake</span>
                </div>
                <p className="text-xs text-white/70 mt-0.5">Batch #24B · Deck 1 &amp; 3</p>
              </div>
            </div>
          </div>

          {/* Stage 3 */}
          <div
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="bg-surface rounded-xl p-4 border border-border flex flex-col justify-between gap-4 hover:border-caramel/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-warm-cream border border-border flex items-center justify-center text-espresso text-xs font-bold">3</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDDB6]/70 border border-[#EAE2D8] text-[#553600] text-[11px] font-bold">
                {inCoolingCount} orders
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-secondary shadow-warm-sm">
                <span className="material-symbols-outlined text-[20px]">schedule</span>
              </div>
              <div>
                <p className="text-sm font-bold text-espresso">Cooling &amp; Slicing</p>
                <p className="text-xs text-secondary">Marble slab resting</p>
              </div>
            </div>
          </div>

          {/* Stage 4 */}
          <div
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="bg-surface rounded-xl p-4 border border-border flex flex-col justify-between gap-4 hover:border-caramel/50 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-full bg-warm-cream border border-border flex items-center justify-center text-espresso text-xs font-bold">4</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FFDBCF]/80 border border-[#EAE2D8] text-[#603F33] text-[11px] font-bold">
                {readyDispatchCount} orders
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-border flex items-center justify-center text-primary shadow-warm-sm">
                <span className="material-symbols-outlined text-[20px]">fact_check</span>
              </div>
              <div>
                <p className="text-sm font-bold text-espresso">Ready for Dispatch</p>
                <p className="text-xs text-secondary">Ribbon sealed &amp; boxed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section C: Urgent Operational Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alert 1 */}
        <div className="bg-[#FFF6E9] border border-[#F4DCB6] p-4 rounded-artisan shadow-warm-sm flex items-start justify-between gap-4 text-[#402600]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FDE7C7] border border-[#F4DCB6] flex-shrink-0 flex items-center justify-center text-[#B0700B]">
              <span className="material-symbols-outlined text-[22px]">warning</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold tracking-tight text-espresso">Evening Slot at Capacity</span>
              <p className="text-xs text-[#73531F] mt-0.5">The 5 PM–9 PM delivery slot is full (20 / 20 orders).</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('delivery-slots')}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-espresso text-white text-xs font-bold shadow-sm hover:bg-black transition-colors"
            type="button"
          >
            Manage Slots
          </button>
        </div>

        {/* Alert 2 */}
        <div className="bg-[#FDF2F0] border border-[#F8D2CC] p-4 rounded-artisan shadow-warm-sm flex items-start justify-between gap-4 text-[#93000A]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FADCD7] border border-[#F8D2CC] flex-shrink-0 flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[22px]">inventory</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-extrabold tracking-tight text-espresso">Limited Batch Availability</span>
              <p className="text-xs text-[#843A30] mt-0.5">Slow-Roasted Kashmiri Walnut Brownie is sold out for today.</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentScreen('inventory')}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-error text-white text-xs font-bold shadow-sm hover:bg-[#A8493F] transition-colors"
            type="button"
          >
            View Inventory
          </button>
        </div>
      </div>

      {/* Main Lower Grid: Orders Table (8 cols) + Production Capacity Insight (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Section D: Recent Orders Table */}
        <div className="lg:col-span-8 card-artisan p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div>
              <h2 className="font-headline text-xl font-bold text-espresso">Recent Orders</h2>
              <p className="text-xs text-secondary font-medium">Real-time status updates across local dispatch hubs</p>
            </div>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="px-3.5 py-1.5 rounded-xl bg-warm-cream border border-border text-espresso text-xs font-bold hover:bg-white transition-all shadow-warm-sm"
            >
              View All Orders
            </button>
          </div>

          <div className="overflow-x-auto -mx-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-secondary text-[11px] font-extrabold uppercase tracking-wider border-y border-border">
                  <th className="py-3 px-4 pl-6">Order ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Locality &amp; Slot</th>
                  <th className="py-3 px-4">Items / Slabs</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {orders.slice(0, 6).map((order) => {
                  const totalItemsCount = order.items.reduce((s, it) => s + it.quantity, 0);
                  const firstItemName = order.items[0]?.name || 'Brownie Slab';
                  const shortName = firstItemName.replace('Brownie Slab', '').replace('Brownie', '').trim();

                  return (
                    <tr key={order.id} className="hover:bg-surface/70 transition-colors">
                      <td className="py-3.5 px-4 pl-6 font-bold text-xs text-primary font-mono">{order.id}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-espresso">{order.customerName}</span>
                          <span className="text-[11px] text-secondary font-medium">{order.phone}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-medium text-espresso">{order.locality}</span>
                          <span className="text-[10px] text-secondary uppercase font-bold">{order.slot.split(',')[0]}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-espresso">
                        <span className="font-bold text-primary">{totalItemsCount} {totalItemsCount === 1 ? 'slab' : 'slabs'}</span>{' '}
                        <span className="text-secondary">({shortName})</span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-extrabold text-espresso">₹{order.total}</td>
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(order.status)}
                      </td>
                      <td className="py-3.5 px-4 pr-6 text-right">
                        <button
                          onClick={() => openOrderDrawer(order)}
                          className="px-2.5 py-1 rounded-lg bg-warm-cream border border-border text-espresso text-[11px] font-bold hover:bg-white transition-colors"
                          type="button"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section E: Production Capacity Insight Card */}
        <div className="lg:col-span-4 card-artisan p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between pb-3 border-b border-border/70">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-caramel">donut_large</span>
              <h3 className="font-headline text-lg font-bold text-espresso">Today's Slab Capacity</h3>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-warm-cream border border-border text-secondary text-[11px] font-extrabold">Tier 1 Kitchen</span>
          </div>

          {/* Visual Progress Radial Gauge Chart */}
          <div className="flex flex-col items-center justify-center p-5 bg-surface rounded-xl border border-border relative">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background Track */}
                <circle cx="50" cy="50" fill="none" r="38" stroke="#EAE2D8" strokeWidth="8"></circle>
                {/* Value Track (70% = 238.76 circumference * 0.3 offset = 71.6) */}
                <circle
                  cx="50"
                  cy="50"
                  fill="none"
                  r="38"
                  stroke="#40251F"
                  strokeDasharray="238.76"
                  strokeDashoffset={238.76 * (1 - capacityPct / 100)}
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-espresso tracking-tight">{capacityPct}%</span>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-secondary">Fulfilled</span>
              </div>
            </div>

            {/* Metrics Triad */}
            <div className="grid grid-cols-3 w-full gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-white border border-border shadow-warm-sm">
                <p className="text-[10px] font-bold text-secondary uppercase">Daily Limit</p>
                <p className="text-base font-extrabold text-espresso mt-0.5">{dailyLimit}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-border shadow-warm-sm">
                <p className="text-[10px] font-bold text-caramel uppercase">Baked</p>
                <p className="text-base font-extrabold text-espresso mt-0.5">{bakedCount}</p>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-border shadow-warm-sm">
                <p className="text-[10px] font-bold text-secondary uppercase">Remaining</p>
                <p className="text-base font-extrabold text-espresso mt-0.5">{remainingCount}</p>
              </div>
            </div>
          </div>

          {/* Next Batch Schedule Info */}
          <div className="p-3.5 rounded-xl bg-primary text-white flex items-start gap-3 shadow-warm-sm">
            <div className="w-8 h-8 rounded-lg bg-black/25 flex items-center justify-center text-caramel flex-shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">timer</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-caramel tracking-tight">Next Oven Batch Scheduled</span>
              <p className="text-xs text-white/80 mt-0.5 leading-snug">4:30 PM (Deck Oven 2) · 6 Slabs Dark Ganache</p>
            </div>
          </div>

          {/* Confectionery Artisan Note */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-warm-cream/60 border border-border">
            <img
              alt="Artisanal chocolate brownie texture"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-border shadow-sm"
              src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=200&q=80"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-espresso">Master Temperature Guard</span>
              <span className="text-[11px] text-secondary leading-snug">Calibrated to 172°C slow-convection for uniform fudgy crusts.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
