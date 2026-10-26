import React from 'react';
import { 
  LayoutDashboard, 
  Flame, 
  Package, 
  Truck, 
  BarChart3, 
  Settings, 
  X,
  Thermometer
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { AdminScreen } from '../types/adminTypes';

export const Sidebar: React.FC = () => {
  const { 
    currentScreen, 
    setCurrentScreen, 
    sidebarOpen, 
    setSidebarOpen, 
    orders, 
    products
  } = useAdmin();

  const handleNavClick = (screen: AdminScreen) => {
    setCurrentScreen(screen);
    // On small screens, close sidebar when link is clicked
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const navItems = [
    {
      group: 'Operations',
      items: [
        {
          id: 'overview' as AdminScreen,
          label: 'Dashboard Overview',
          icon: LayoutDashboard,
          badge: null
        },
        {
          id: 'kitchen-orders' as AdminScreen,
          label: 'Live Kitchen Orders',
          icon: Flame,
          badge: orders.length.toString(),
          badgeColor: 'bg-amber-100 text-amber-800'
        },
        {
          id: 'inventory' as AdminScreen,
          label: 'Brownie Inventory',
          icon: Package,
          badge: products.length.toString(),
          badgeColor: 'bg-caramel-100 text-caramel-800'
        },
        {
          id: 'delivery-slots' as AdminScreen,
          label: 'Delivery & Slots',
          icon: Truck,
          badge: null
        },
        {
          id: 'analytics' as AdminScreen,
          label: 'Analytics & Reports',
          icon: BarChart3,
          badge: null
        }
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[57px] left-0 h-screen lg:h-[calc(100vh-57px)] w-64 bg-white text-chocolate-900 border-r border-stone-200/90 flex flex-col justify-between z-40 transition-transform duration-300 ease-in-out shrink-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 lg:w-64'
        }`}
      >
        {/* Top Header on mobile to close */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-caramel-500 text-white font-black flex items-center justify-center font-serif text-sm">
              R
            </div>
            <span className="font-serif font-bold text-chocolate-950 text-sm">Rasolicious Atelier</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Sections */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          {navItems.map(section => (
            <div key={section.group} className="space-y-1.5">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-stone-400 px-3 py-1">
                {section.group}
              </span>
              <div className="space-y-1">
                {section.items.map(item => {
                  const Icon = item.icon;
                  const isActive = currentScreen === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-gradient-to-r from-caramel-500 to-caramel-600 text-white shadow-sm font-bold'
                          : 'text-chocolate-800 hover:text-chocolate-950 hover:bg-stone-100/80'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-caramel-600'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : item.badgeColor
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer: Settings & Live Oven Telemetry */}
        <div className="p-3.5 border-t border-stone-200 bg-stone-50/70 space-y-3">
          <button
            onClick={() => handleNavClick('delivery-slots')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-stone-700 hover:text-chocolate-950 hover:bg-stone-100 transition-colors"
          >
            <Settings className="w-4 h-4 text-stone-500" />
            <span>Bakery Operations Settings</span>
          </button>

          {/* Live Kitchen Oven Telemetry Widget */}
          <div className="bg-white border border-stone-200 rounded-xl p-3 text-xs space-y-2 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="font-semibold text-chocolate-950 text-[11px]">Live Kitchen Active</span>
              </div>
              <Thermometer className="w-3.5 h-3.5 text-caramel-600" />
            </div>

            <div className="space-y-1 text-[11px] pt-1.5 border-t border-stone-100">
              <div className="flex justify-between text-stone-600">
                <span>Deck Oven #1:</span>
                <span className="font-mono text-emerald-700 font-bold">165°C Optimal</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Convection #2:</span>
                <span className="font-mono text-emerald-700 font-bold">180°C Ready</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
