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
      color: 'bg-amber-100 text-amber-700'
    },
    {
      label: 'Orders Received',
      value: ordersReceived.toString(),
      trend: '42 today target',
      trendPositive: true,
      icon: Receipt,
      color: 'bg-sky-100 text-sky-700'
    },
    {
      label: 'In Production',
      value: inProductionCount.toString(),
      trend: `${inOvenCount} oven • ${inCoolingCount} cooling`,
      trendPositive: true,
      icon: Flame,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      label: 'Pending Dispatch',
      value: pendingDispatchCount.toString(),
      trend: 'NH-66 courier route',
      trendPositive: true,
      icon: Truck,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      label: 'Brownie Catalogue',
      value: `${availableProductsCount}/${products.length}`,
      trend: 'Available Slabs',
      trendPositive: true,
      icon: Package,
      color: 'bg-emerald-100 text-emerald-700'
    }
  ];

  // Pipeline stage counts
  const pipelineStages: { id: OrderStatus; label: string; count: number; color: string }[] = [
    { id: 'received', label: 'Received', count: orders.filter(o => o.status === 'received').length, color: 'text-amber-800 bg-amber-50 border-amber-200 hover:bg-amber-100/70' },
    { id: 'oven', label: 'In Oven', count: inOvenCount, color: 'text-orange-800 bg-orange-50 border-orange-200 hover:bg-orange-100/70' },
    { id: 'cooling', label: 'Cooling & Slicing', count: inCoolingCount, color: 'text-sky-800 bg-sky-50 border-sky-200 hover:bg-sky-100/70' },
    { id: 'delivery', label: 'Out for Delivery', count: pendingDispatchCount, color: 'text-purple-800 bg-purple-50 border-purple-200 hover:bg-purple-100/70' },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length, color: 'text-emerald-800 bg-emerald-50 border-emerald-200 hover:bg-emerald-100/70' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            Good morning, Chef Rasool
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Here's your brownie atelier's live operational overview for Kanniyakumari Hub.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => openModal('addProduct')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-caramel-500 hover:bg-caramel-600 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Brownie</span>
          </button>
          <button
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-stone-50 text-chocolate-900 font-semibold text-xs border border-stone-200 transition-colors shadow-xs"
          >
            <span>Live Queue</span>
            <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
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
              className="bg-white border border-stone-200/90 rounded-2xl p-4 shadow-xs relative overflow-hidden group hover:border-caramel-300 hover:shadow-sm transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  {kpi.label}
                </span>
                <div className={`p-2 rounded-xl ${kpi.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="font-serif font-black text-xl sm:text-2xl text-chocolate-950 mt-2">
                {kpi.value}
              </div>
              <div className="text-[11px] text-caramel-700 font-semibold mt-1">
                {kpi.trend}
              </div>
            </div>
          );
        })}
      </div>

      {/* Baking & Dispatch Pipeline Queue */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-chocolate-950">
                Live Kitchen Production Pipeline
              </h3>
              <p className="text-xs text-stone-500">
                Track confections progressing from oven to doorstep across Kanniyakumari.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('kitchen-orders')}
            className="text-xs font-semibold text-caramel-700 hover:text-caramel-800 flex items-center gap-1"
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
              className={`p-3.5 rounded-2xl border cursor-pointer transition-all hover:scale-[1.02] shadow-xs ${stage.color}`}
            >
              <span className="text-[10px] font-bold uppercase tracking-wider block">
                {stage.label}
              </span>
              <div className="font-serif font-black text-2xl mt-1 text-chocolate-950">
                {stage.count}
              </div>
              <span className="text-[10px] text-stone-600 mt-0.5 block font-medium">
                {stage.count === 1 ? '1 active order' : `${stage.count} active orders`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Delivery Slots Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Urgent Orders (2 cols) */}
        <div className="lg:col-span-2 bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-chocolate-950">
              Recent Kitchen Dispatches
            </h3>
            <button
              onClick={() => setCurrentScreen('kitchen-orders')}
              className="text-xs text-caramel-700 hover:text-caramel-800 font-semibold flex items-center gap-1"
            >
              <span>View All ({orders.length})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-stone-100">
            {orders.slice(0, 5).map(order => (
              <div
                key={order.id}
                onClick={() => openOrderDrawer(order)}
                className="py-3 flex items-center justify-between gap-3 hover:bg-stone-50 p-2.5 rounded-2xl cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-stone-100 border border-stone-200 flex items-center justify-center font-mono font-bold text-xs text-caramel-700">
                    {order.id.slice(-3)}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-chocolate-950 group-hover:text-caramel-700 transition-colors">
                      {order.customerName}
                    </div>
                    <div className="text-[11px] text-stone-500">
                      {order.locality} • <span className="text-stone-700">{order.slot.split(',')[0]}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-chocolate-950">
                    ₹{order.total}
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    order.status === 'oven' ? 'bg-orange-100 text-orange-800' :
                    order.status === 'cooling' ? 'bg-sky-100 text-sky-800' :
                    order.status === 'delivery' ? 'bg-purple-100 text-purple-800' :
                    order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Slot Booking Progress (1 col) */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-chocolate-950">
              Today's Slot Capacity
            </h3>
            <button
              onClick={() => setCurrentScreen('delivery-slots')}
              className="text-xs text-caramel-700 hover:text-caramel-800 font-semibold"
            >
              Manage
            </button>
          </div>

          <div className="space-y-3.5">
            {deliverySlots.map(slot => {
              const pct = Math.min(100, Math.round((slot.booked / slot.capacity) * 100));
              const isFull = slot.booked >= slot.capacity;

              return (
                <div key={slot.id} className="bg-stone-50/80 border border-stone-200/70 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-chocolate-950">{slot.name}</span>
                      <span className="text-[10px] text-stone-500 ml-1.5">({slot.timeWindow})</span>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isFull ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {slot.booked}/{slot.capacity}
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFull ? 'bg-rose-500' : 'bg-caramel-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-stone-100 text-xs text-stone-500 space-y-2">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-caramel-600 shrink-0 mt-0.5" />
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
