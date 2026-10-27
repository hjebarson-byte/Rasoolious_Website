import React from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { BRAND_CONFIG } from '../../config/brand';
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
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const inOvenCount = orders.filter(o => o.status === 'oven').length;
  const lowStockCount = products.filter(p => p.status === 'Limited Stock' || p.booked >= p.dailyLimit - 6).length;

  const navItems = [
    {
      id: 'overview' as AdminScreen,
      label: 'Dashboard',
      icon: 'dashboard',
      badge: null
    },
    {
      id: 'kitchen-orders' as AdminScreen,
      label: 'Kitchen Orders',
      icon: 'skillet',
      badge: `${inOvenCount || 6} IN OVEN`,
      badgeStyle: 'bg-[#FFDDB6] text-[#402600]'
    },
    {
      id: 'inventory' as AdminScreen,
      label: 'Brownie Inventory',
      icon: 'inventory_2',
      badge: `${lowStockCount || 2} Low`,
      badgeStyle: 'bg-[#FFDBCF] text-[#603F33]'
    },
    {
      id: 'delivery-slots' as AdminScreen,
      label: 'Delivery & Zones',
      icon: 'local_shipping',
      badge: null
    },
    {
      id: 'analytics' as AdminScreen,
      label: 'Analytics & Sales',
      icon: 'query_stats',
      badge: null
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-espresso/40 backdrop-blur-xs z-30 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-0 left-0 h-screen w-[260px] bg-white border-r border-border shadow-[0_1px_8px_rgba(43,27,23,0.04)] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 font-body ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Atelier Brand Header */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-border/70">
            <div className="flex items-center gap-3">
              <img
                src={BRAND_CONFIG.logo}
                alt="Rasoolicious Logo"
                className="h-8 w-8 object-cover rounded-lg border border-border"
              />
              <div className="flex flex-col">
                <span className="font-headline text-[17px] font-bold text-espresso leading-tight tracking-tight">
                  Rasoolicious
                </span>
                <span className="text-[10px] text-secondary font-bold tracking-[0.18em] uppercase mt-0.5">
                  Atelier Bakery
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-[#FFDBCF] text-[#40251F] text-[10px] font-extrabold uppercase tracking-wider">
                Admin
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 rounded-lg text-secondary hover:text-espresso lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Section Label */}
          <div className="px-5 pt-4 pb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-secondary/70">
              Operations Engine
            </span>
          </div>

          {/* Nav Links */}
          <nav className="px-3 flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all group w-full text-left ${
                    isActive
                      ? 'bg-primary text-white font-semibold shadow-sm'
                      : 'text-secondary hover:bg-warm-cream hover:text-espresso'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`material-symbols-outlined text-[20px] ${
                        isActive ? 'text-caramel' : 'text-secondary group-hover:text-espresso'
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className={`text-sm ${isActive ? 'font-semibold tracking-tight' : 'font-medium'}`}>
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight ${item.badgeStyle}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Bottom Profile & Action */}
        <div className="p-4 border-t border-border flex flex-col gap-3 bg-surface/60">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-xl bg-white border border-border text-espresso hover:bg-warm-cream text-xs font-bold shadow-sm transition-all"
          >
            <span>View Storefront</span>
            <span className="material-symbols-outlined text-[15px] text-secondary">north_east</span>
          </Link>

          <div className="flex items-center gap-3 pt-1">
            <div className="relative flex-shrink-0">
              <img
                src={BRAND_CONFIG.logo}
                alt="Chef Rasool Avatar"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-border"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-600 rounded-full ring-2 ring-white"></span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-espresso truncate">Chef Rasool</span>
              <span className="text-[11px] text-secondary truncate font-medium">Super Admin</span>
            </div>
            <button
              onClick={() => handleNavClick('delivery-slots')}
              className="text-secondary hover:text-espresso p-1 rounded-lg hover:bg-warm-cream transition-colors"
              type="button"
              title="Atelier Settings"
            >
              <span className="material-symbols-outlined text-[18px]">more_vert</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
