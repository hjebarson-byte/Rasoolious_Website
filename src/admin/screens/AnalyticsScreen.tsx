import React, { useState } from 'react';
import { 
  Trophy, 
  PieChart, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  Truck 
} from 'lucide-react';
import { INITIAL_ANALYTICS } from '../data/initialAdminData';

export const AnalyticsScreen: React.FC = () => {
  const [period, setPeriod] = useState<'today' | 'week' | 'month'>('today');

  const currPeriodData = INITIAL_ANALYTICS.revenuePeriods[period];
  const maxVal = Math.max(...currPeriodData.data);

  return (
    <div className="space-y-6">
      
      {/* Header with Timeframe selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-cream-50">
            Baking Performance & Analytics
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-300 mt-1">
            Understand customer demand, popular confections, and dispatch performance across Kanniyakumari.
          </p>
        </div>

        {/* Timeframe Toggle Buttons */}
        <div className="flex items-center gap-1 bg-chocolate-900 border border-chocolate-800 p-1 rounded-2xl text-xs font-semibold self-start sm:self-auto">
          {(['today', 'week', 'month'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3.5 py-1.5 rounded-xl transition-all capitalize ${
                period === p
                  ? 'bg-caramel-500 text-chocolate-950 font-bold shadow-sm'
                  : 'text-chocolate-300 hover:text-white'
              }`}
            >
              {p === 'today' ? 'Today' : p === 'week' ? 'This Week' : 'This Month'}
            </button>
          ))}
        </div>
      </div>

      {/* Period Revenue Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-400">
            Period Revenue ({period.toUpperCase()})
          </span>
          <div className="font-serif font-black text-3xl text-caramel-300">
            ₹{currPeriodData.total.toLocaleString()}
          </div>
          <p className="text-xs text-emerald-400 font-semibold pt-1">
            ↑ +18.4% above target
          </p>
        </div>

        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-400">
            Orders Fulfilled
          </span>
          <div className="font-serif font-black text-3xl text-cream-50">
            {currPeriodData.orders} orders
          </div>
          <p className="text-xs text-caramel-400 font-semibold pt-1">
            Average Order Value: ₹{Math.round(currPeriodData.total / currPeriodData.orders)}
          </p>
        </div>

        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-1 sm:col-span-2 lg:col-span-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-chocolate-400">
            Peak Baking Hour
          </span>
          <div className="font-serif font-black text-3xl text-amber-400">
            4:00 PM – 6:00 PM
          </div>
          <p className="text-xs text-chocolate-300 pt-1">
            Evening dessert boxes spike before dinner
          </p>
        </div>
      </div>

      {/* Interactive Visual Bar Chart */}
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-base text-cream-50">
              Revenue Velocity ({period === 'today' ? 'Hourly Intervals' : period === 'week' ? 'Daily Totals' : 'Weekly Run-Rate'})
            </h3>
            <p className="text-xs text-chocolate-400">
              Distribution of incoming confectionery sales over time.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-chocolate-400">
            <span className="w-3 h-3 rounded-full bg-caramel-500 inline-block" />
            <span>Sales in INR</span>
          </div>
        </div>

        {/* Bars Container */}
        <div className="pt-8 pb-4">
          <div className="h-48 flex items-end justify-between gap-3 sm:gap-6 border-b border-chocolate-850 pb-2 px-2">
            {currPeriodData.labels.map((lbl, idx) => {
              const val = currPeriodData.data[idx];
              const pct = maxVal > 0 ? Math.round((val / maxVal) * 100) : 0;

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span className="text-[10px] font-mono text-caramel-300 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    ₹{val > 999 ? `${(val / 1000).toFixed(1)}k` : val}
                  </span>
                  <div className="w-full max-w-[48px] bg-chocolate-900 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-caramel-600 to-caramel-400 rounded-t-xl transition-all duration-700 group-hover:from-caramel-500 group-hover:to-caramel-300"
                      style={{ height: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-mono text-chocolate-400 mt-1 whitespace-nowrap">
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
        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="font-serif font-bold text-base text-cream-50">
                Top Treats Leaderboard
              </h3>
            </div>
            <span className="text-xs text-caramel-400 font-semibold">Today's Sales Share</span>
          </div>

          <div className="divide-y divide-chocolate-850">
            {INITIAL_ANALYTICS.topTreatsLeaderboard.map(item => (
              <div key={item.rank} className="py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                    item.rank === 1 ? 'bg-amber-500 text-chocolate-950' :
                    item.rank === 2 ? 'bg-slate-300 text-chocolate-950' :
                    item.rank === 3 ? 'bg-amber-700 text-cream-100' :
                    'bg-chocolate-900 text-chocolate-400'
                  }`}>
                    {item.rank}
                  </div>
                  <div>
                    <div className="font-semibold text-xs text-cream-100">{item.name}</div>
                    <div className="text-[10px] text-chocolate-400">{item.category} • {item.unitsSold} units sold</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-caramel-300">
                    ₹{item.revenue.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-chocolate-400 font-mono">
                    {item.salesShare}% of revenue
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Status Distribution */}
        <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-caramel-400" />
              <h3 className="font-serif font-bold text-base text-cream-50">
                Status Pipeline Distribution
              </h3>
            </div>
            <span className="text-xs text-chocolate-400">42 total orders</span>
          </div>

          <div className="space-y-3 pt-2">
            {INITIAL_ANALYTICS.statusDistribution.map(st => (
              <div key={st.status} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-cream-200 font-medium">{st.status}</span>
                  <span className="font-mono text-chocolate-300 font-semibold">
                    {st.count} orders ({st.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-chocolate-900 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${st.percentage}%`, backgroundColor: st.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-chocolate-850 flex flex-wrap gap-3 text-[11px] text-chocolate-400">
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
      <div className="bg-chocolate-950 border border-chocolate-850 rounded-3xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-caramel-400" />
          <h3 className="font-serif font-bold text-base text-cream-50">
            AI Bakery Operational Insights & Stock Warnings
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {INITIAL_ANALYTICS.insights.map((ins, idx) => {
            let borderStyle = 'border-chocolate-800 bg-chocolate-900/40 text-cream-100';
            let Icon = Sparkles;
            let iconColor = 'text-caramel-400';

            if (ins.type === 'warning') {
              borderStyle = 'border-amber-500/30 bg-amber-500/10 text-amber-200';
              Icon = AlertTriangle;
              iconColor = 'text-amber-400';
            } else if (ins.type === 'error') {
              borderStyle = 'border-terracotta-500/30 bg-terracotta-500/10 text-terracotta-200';
              Icon = Clock;
              iconColor = 'text-terracotta-400';
            } else if (ins.type === 'info') {
              borderStyle = 'border-sky-500/30 bg-sky-500/10 text-sky-200';
              Icon = Truck;
              iconColor = 'text-sky-400';
            }

            return (
              <div key={idx} className={`p-4 rounded-2xl border ${borderStyle} flex items-start gap-3`}>
                <div className="p-2 rounded-xl bg-chocolate-950/60 shrink-0 mt-0.5">
                  <Icon className={`w-4 h-4 ${iconColor}`} />
                </div>
                <div>
                  <h4 className="font-bold text-xs font-serif text-cream-50">{ins.title}</h4>
                  <p className="text-[11px] leading-relaxed mt-1 text-chocolate-300">
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
