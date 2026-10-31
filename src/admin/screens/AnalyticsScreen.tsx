import React, { useState } from 'react';
import { 
  Trophy, 
  PieChart, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Truck 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { INITIAL_ANALYTICS } from '../data/initialAdminData';

export const AnalyticsScreen: React.FC = () => {
  const { orders } = useAdmin();
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const currPeriodData = INITIAL_ANALYTICS.revenuePeriods[period];
  const liveTodayTotal = orders.reduce((sum, ord) => sum + ord.total, 0);
  const liveTodayOrders = orders.length;

  const displayTotal = period === 'today' ? liveTodayTotal : currPeriodData.total;
  const displayOrders = period === 'today' ? liveTodayOrders : currPeriodData.orders;
  const avgOrderVal = displayOrders > 0 ? Math.round(displayTotal / displayOrders) : 0;

  const maxVal = Math.max(...currPeriodData.data);

  return (
    <div className="space-y-6">
      
      {/* Header with Timeframe selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-chocolate-950">
            Baking Performance & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Understand customer demand, popular confections, and dispatch performance across Kanniyakumari.
          </p>
        </div>

        {/* Timeframe Toggle Buttons */}
        <div className="flex items-center gap-1 bg-white border border-stone-200 p-1 rounded-2xl text-xs font-semibold shadow-xs self-start sm:self-auto">
          {(['today', 'week', 'month'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 rounded-xl transition-all capitalize ${
                period === p
                  ? 'bg-caramel-500 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Period Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Period Revenue ({period.toUpperCase()})
          </span>
          <div className="font-serif font-black text-3xl text-chocolate-950">
            ₹{displayTotal.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-700 font-semibold pt-1">
            ↑ +18.4% above target
          </p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Orders Fulfilled
          </span>
          <div className="font-serif font-black text-3xl text-chocolate-950">
            {displayOrders} orders
          </div>
          <p className="text-xs text-caramel-700 font-semibold pt-1">
            Average Order Value: ₹{avgOrderVal}
          </p>
        </div>

        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Peak Baking Hour
          </span>
          <div className="font-serif font-black text-3xl text-orange-600">
            4:00 PM – 6:00 PM
          </div>
          <p className="text-xs text-stone-500 pt-1">
            Evening dessert boxes spike before dinner
          </p>
        </div>
      </div>

      {/* Interactive Visual Bar Chart */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-chocolate-950">
              Revenue Velocity ({period === 'today' ? 'Hourly Intervals' : period === 'week' ? 'Daily Totals' : 'Weekly Run-Rate'})
            </h3>
            <p className="text-xs text-stone-500">
              Distribution of incoming confectionery sales over time.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-3 h-3 rounded-full bg-caramel-500 inline-block" />
            <span>Sales in INR</span>
          </div>
        </div>

        {/* Bars Container */}
        <div className="pt-8 pb-4">
          <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 border-b border-stone-100 pb-2 px-2">
            {currPeriodData.labels.map((lbl, idx) => {
              const val = currPeriodData.data[idx];
              const pct = maxVal > 0 ? Math.round((val / maxVal) * 100) : 0;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-caramel-700 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    ₹{val > 999 ? `${(val / 1000).toFixed(1)}k` : val}
                  </span>
                  <div className="w-full max-w-[48px] bg-stone-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-caramel-600 to-caramel-400 rounded-t-xl transition-all duration-700 group-hover:from-caramel-500 group-hover:to-caramel-300"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-stone-500 mt-1 whitespace-nowrap">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Top Treats Leaderboard & Status Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Top Treats Leaderboard */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <h3 className="font-serif font-bold text-base text-chocolate-950">
                Top Treats Leaderboard
              </h3>
            </div>
            <span className="text-xs text-caramel-700 font-semibold">Today's Sales Share</span>
          </div>

          <div className="divide-y divide-stone-100">
            {INITIAL_ANALYTICS.topTreatsLeaderboard.map(item => (
              <div key={item.rank} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    item.rank === 1 ? 'bg-amber-100 text-amber-800 font-bold border border-amber-200' :
                    item.rank === 2 ? 'bg-slate-100 text-slate-800 font-bold border border-slate-200' :
                    item.rank === 3 ? 'bg-orange-100 text-orange-800 font-bold border border-orange-200' :
                    'bg-stone-100 text-stone-600 font-semibold'
                  }`}>
                    {item.rank}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-chocolate-950">{item.name}</div>
                    <div className="text-[10px] text-stone-500">{item.category} • {item.unitsSold} units sold</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-caramel-700">
                    ₹{item.revenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-stone-500 font-mono">
                    {item.salesShare}% of revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-caramel-600" />
              <h3 className="font-serif font-bold text-base text-chocolate-950">
                Status Pipeline Distribution
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">42 total orders</span>
          </div>

          <div className="space-y-3 pt-2">
            {INITIAL_ANALYTICS.statusDistribution.map(st => (
              <div key={st.status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-chocolate-900 font-medium">{st.status}</span>
                  <span className="font-mono text-stone-500 font-semibold">
                    {st.count} orders ({st.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${st.percentage}%`, backgroundColor: st.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-wrap gap-3 text-[11px] text-stone-500 font-medium">
            {INITIAL_ANALYTICS.statusDistribution.map(st => (
              <div key={st.status} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: st.color }} />
                <span>{st.status}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Bakery Operational Insights */}
      <div className="bg-white border border-stone-200/90 rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-caramel-600" />
          <h3 className="font-serif font-bold text-base text-chocolate-950">
            AI Bakery Operational Insights & Stock Warnings
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {INITIAL_ANALYTICS.insights.map((ins, idx) => {
            let borderStyle = 'border-stone-200 bg-stone-50 text-chocolate-900';
            let Icon = Sparkles;
            let iconColor = 'text-caramel-600';

            if (ins.type === 'warning') {
              borderStyle = 'border-amber-200 bg-amber-50/70 text-amber-900';
              Icon = AlertTriangle;
              iconColor = 'text-amber-600';
            } else if (ins.type === 'error') {
              borderStyle = 'border-rose-200 bg-rose-50/70 text-rose-900';
              Icon = Clock;
              iconColor = 'text-rose-600';
            } else if (ins.type === 'info') {
              borderStyle = 'border-sky-200 bg-sky-50/70 text-sky-900';
              Icon = Truck;
              iconColor = 'text-sky-600';
            }

            return (
              <div key={idx} className={`p-4 rounded-2xl border ${borderStyle} flex items-start gap-3 shadow-2xs`}>
                <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0 mt-0.5">
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <h4 className="font-bold text-xs font-serif text-chocolate-950">{ins.title}</h4>
                  <p className="text-[11px] leading-relaxed mt-1 text-stone-600 font-medium">
                    {ins.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
