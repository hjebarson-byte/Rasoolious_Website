import React from 'react';
import { 
  TrendingUp, 
  Receipt, 
  Flame, 
  Truck, 
  Package, 
  ArrowRight, 
  Plus, 
  AlertCircle, 
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { OrderStatus } from '../types/adminTypes';

export const OverviewScreen: React.FC = () => {
  const { 
    orders, 
    products, 
    deliverySlots, 
    setCurrentScreen, 
    openModal, 
    openOrderDrawer 
  } = useAdmin();

  // Metrics
  const todayRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const ordersReceived = orders.length;
  const inOvenCount = orders.filter(o => o.status === 'oven').length;
  const inCoolingCount = orders.filter(o => o.status === 'cooling').length;
  const inProductionCount = inOvenCount + inCoolingCount;
  const pendingDispatchCount = orders.filter(o => o.status === 'delivery').length;
  const availableProductsCount = products.filter(p => p.status === 'In Stock').length;

  const kpis = [
    {
      label: "Today's Revenue",
      value: `₹${todayRevenue.toLocaleString()}`,
      trend: '+18.4% vs yesterday',
      trendPositive: true,
      icon: TrendingUp,
      color: 'from-amber-500/20 to-caramel-500/20 text-caramel-400'
    },
    {
      label: 'Orders Received',
      value: ordersReceived.toString(),
      trend: '42 today target',
      trendPositive: true,
      icon: Receipt,
      color: 'from-blue-500/20 to-sky-500/20 text-sky-400'
    },
    {
      label: 'In Production',
      value: inProductionCount.toString(),
      trend: `${inOvenCount} oven • ${inCoolingCount} cooling`,
      trendPositive: true,
      icon: Flame,
      color: 'from-orange-500/20 to-amber-500/20 text-amber-400'
    },
    {
      label: 'Pending Dispatch',
      value: pendingDispatchCount.toString(),
      trend: 'NH-66 courier route',
      trendPositive: true,
      icon: Truck,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400'
    },
    {
      label: 'Batch Catalogue',
      value: `${availableProductsCount}/${products.length}`,
      trend: 'Available Treats',
      trendPositive: true,
      icon: Package,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400'
    }
  ];

  // Pipeline stage counts
  const pipelineStages: { id: OrderStatus; label: string; count: number; color: string }[] = [
    { id: 'received', label: 'Received', count: orders.filter(o => o.status === 'received').length, color: 'text-amber-400 bg-amber-500/10 border-amber-500/30' },
    { id: 'oven', label: 'In Oven', count: inOvenCount, color: 'text-orange-400 bg-orange-500/10 border-orange-500/30' },
    { id: 'cooling', label: 'Cooling & Slicing', count: inCoolingCount, color: 'text-sky-400 bg-sky-500/10 border-sky-500/30' },
    { id: 'delivery', label: 'Out for Delivery', count: pendingDispatchCount, color: 'text-purple-400 bg-purple-500/10 border-purple-500/30' },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
            Good morning, Chef Rasool
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-300 mt-1">
            Here's your bakery's live operational overview for Kanniyakumari Hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openModal('addProduct')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Treat</span>
          </button>
          <button
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-chocolate-900 hover:bg-chocolate-850 text-cream-100 font-semibold text-xs border border-chocolate-800 transition-colors"
          >
            <span>Live Queue</span>
            <ArrowRight className="w-3.5 h-3.5 text-caramel-400" />
          </button>
        </div>
      </div>

      {/* 5 KPI Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-chocolate-950 border border-chocolate-850 rounded-2xl p-4 shadow-sm relative overflow-hidden group hover:border-chocolate-700 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-400">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl bg-gradient-to-br ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif font-black text-xl sm:text-2xl text-cream-50 mt-2">
                {kpi.value}
              </div>
              <div className="text-[11px] text-caramel-400 font-semibold mt-1">
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Baking & Dispatch Pipeline Queue */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-caramel-500/20 text-caramel-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-cream-50">
                Live Kitchen Production Pipeline
              </h3>
              <p className="text-xs text-chocolate-400">
                Track confections progressing from oven to doorstep across Kanniyakumari.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="text-xs font-semibold text-caramel-400 hover:text-caramel-300 flex items-center gap-1"
          >
            <span>Manage Orders</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {pipelineStages.map((stage) => (
            <div
              key={stage.id}
              onClick={() => setCurrentScreen('kitchen-orders')}
              className={`p-3.5 rounded-2xl border cursor-pointer hover:scale-[1.02] transition-transform ${stage.color}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider block">
                {stage.label}
              </span>
              <div className="font-serif font-black text-2xl mt-1 text-cream-50">
                {stage.count}
              </div>
              <span className="text-[10px] text-chocolate-400 mt-0.5 block">
                {stage.count === 1 ? '1 active order' : `${stage.count} active orders`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Delivery Slots Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Urgent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-cream-50">
              Recent Kitchen Dispatches
            </h3>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="text-xs text-caramel-400 hover:text-caramel-300 font-semibold flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-chocolate-850">
            {orders.slice(0, 5).map(order => (
              <div
                key={order.id}
                onClick={() => openOrderDrawer(order)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-chocolate-900/60 p-2 rounded-xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-chocolate-900 border border-chocolate-800 flex items-center justify-center font-mono font-bold text-xs text-caramel-300">
                    {order.id.slice(-3)}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-cream-100 group-hover:text-caramel-300 transition-colors">
                      {order.customerName}
                    </div>
                    <div className="text-[11px] text-chocolate-400">
                      {order.locality} • <span className="text-chocolate-300">{order.slot.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-cream-100">
                    ₹{order.total}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    order.status === 'oven' ? 'bg-amber-500/20 text-amber-300' :
                    order.status === 'delivery' ? 'bg-purple-500/20 text-purple-300' :
                    order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' :
                    'bg-chocolate-800 text-chocolate-300'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Slot Booking Progress (1 col) */}
        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-cream-50">
              Today's Slot Capacity
            </h3>
            <button
              onClick={() => setCurrentScreen('delivery-slots')}
              className="text-xs text-caramel-400 hover:text-caramel-300 font-semibold"
            >
              Manage
            </button>
          </div>

          <div className="space-y-4">
            {deliverySlots.map(slot => {
              const pct = Math.min(100, Math.round((slot.booked / slot.capacity) * 100));
              const isFull = slot.booked >= slot.capacity;

              return (
                <div key={slot.id} className="bg-chocolate-900/60 border border-chocolate-850 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-cream-100">{slot.name}</span>
                      <span className="text-[10px] text-chocolate-400 ml-1.5">({slot.timeWindow})</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFull ? 'bg-terracotta-500/20 text-terracotta-300' : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {slot.booked}/{slot.capacity}
                    </span>
                  </div>

                  <div className="w-full bg-chocolate-950 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-terracotta-500' : 'bg-caramel-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-chocolate-850 text-xs text-chocolate-400 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-caramel-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                Evening slot is currently capped at 20 orders to preserve warm bake dispatch quality.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
