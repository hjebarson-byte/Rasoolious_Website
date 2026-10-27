import React, { useState, useRef, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { BRAND_CONFIG } from '../../config/brand';

export const TopNav: React.FC = () => {
  const { 
    setSidebarOpen, 
    setCurrentScreen, 
    notifications, 
    removeNotification, 
    orders, 
    products, 
    openOrderDrawer,
    openModal 
  } = useAdmin();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close notifications dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Search Results
  const matchedOrders = searchQuery.trim()
    ? orders.filter(
        o =>
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.phone.includes(searchQuery)
      ).slice(0, 4)
    : [];

  const matchedProducts = searchQuery.trim()
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <header className="sticky top-0 z-40 h-16 bg-white/95 backdrop-blur-md border-b border-border shadow-[0_1px_6px_rgba(43,27,23,0.03)] flex items-center justify-between px-4 sm:px-8 font-body">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(prev => !prev)}
          className="p-1.5 rounded-xl text-secondary hover:text-espresso hover:bg-warm-cream transition-colors lg:hidden"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold text-secondary">
          <span className="material-symbols-outlined text-[18px] text-caramel">bakery_dining</span>
          <span
            onClick={() => setCurrentScreen('overview')}
            className="hover:text-espresso cursor-pointer transition-colors"
          >
            Atelier
          </span>
          <span className="text-border">/</span>
          <span className="text-primary font-bold">Console</span>
        </div>
      </div>

      {/* Center: Quick Search Bar */}
      <div className="flex-1 max-w-lg mx-3 sm:mx-6 relative">
        <div className="relative flex items-center">
          <span className="material-symbols-outlined absolute left-3 text-secondary/60 text-[18px]">search</span>
          <input
            ref={searchRef}
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            placeholder="Search order ID (e.g. RAS1044), customer, phone..."
            className="w-full h-10 pl-9 pr-16 bg-warm-cream/60 border border-border rounded-xl text-xs font-medium text-espresso placeholder:text-secondary/60 focus:outline-none focus:ring-1 focus:ring-secondary focus:bg-white transition-all"
          />
          <span className="absolute right-2.5 px-1.5 py-0.5 bg-white border border-border text-secondary rounded text-[10px] font-bold tracking-wider hidden sm:inline">
            Ctrl K
          </span>
        </div>

        {/* Quick Search Dropdown */}
        {searchFocused && searchQuery.trim() && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-warm-lg overflow-hidden z-50 text-xs">
            {matchedOrders.length === 0 && matchedProducts.length === 0 ? (
              <div className="p-4 text-secondary text-center font-medium">
                No orders or brownie slabs found matching "{searchQuery}"
              </div>
            ) : (
              <div className="divide-y divide-border/60 max-h-72 overflow-y-auto">
                {matchedOrders.length > 0 && (
                  <div className="p-2">
                    <div className="text-[10px] uppercase font-bold text-caramel px-2 py-1">Matching Orders</div>
                    {matchedOrders.map(ord => (
                      <button
                        key={ord.id}
                        onClick={() => {
                          openOrderDrawer(ord);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-warm-cream/70 flex items-center justify-between text-espresso transition-colors"
                      >
                        <div>
                          <span className="font-bold text-primary mr-2 font-mono">{ord.id}</span>
                          <span className="font-semibold">{ord.customerName}</span>
                          <span className="text-[11px] text-secondary ml-2">({ord.locality})</span>
                        </div>
                        <span className="text-xs font-bold font-mono">₹{ord.total}</span>
                      </button>
                    ))}
                  </div>
                )}

                {matchedProducts.length > 0 && (
                  <div className="p-2">
                    <div className="text-[10px] uppercase font-bold text-caramel px-2 py-1">Brownie Slabs</div>
                    {matchedProducts.map(prod => (
                      <button
                        key={prod.id}
                        onClick={() => {
                          setCurrentScreen('inventory');
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-warm-cream/70 flex items-center justify-between text-espresso transition-colors"
                      >
                        <div>
                          <span className="font-semibold">{prod.name}</span>
                          <span className="text-[10px] text-secondary ml-2">[{prod.category}]</span>
                        </div>
                        <span className="text-xs font-bold text-emerald-700 font-mono">₹{prod.price}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right: Status Badges, Notifications & Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Ovens Online Live Indicator */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-warm-cream/80 border border-border">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-xs font-bold text-espresso">Ovens Online</span>
        </div>

        {/* 14 Slabs in Progress Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFDDB6]/70 border border-[#EAE2D8] text-[#402600]">
          <span className="material-symbols-outlined text-[17px] text-[#795548]">skillet</span>
          <span className="text-xs font-bold tracking-tight">14 Slabs in Progress</span>
        </div>

        {/* Notifications Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(prev => !prev)}
            className="relative p-2 rounded-xl text-secondary hover:text-espresso hover:bg-warm-cream transition-colors"
            type="button"
            title="Notifications"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-error ring-2 ring-white"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-border rounded-xl shadow-warm-lg p-3 z-50 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-border font-bold text-espresso">
                <span>Atelier Notifications</span>
                <span className="text-[10px] bg-warm-cream px-2 py-0.5 rounded-full text-secondary">
                  {notifications.length} active
                </span>
              </div>
              <div className="divide-y divide-border/60 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-3 text-secondary text-center">No new notifications</p>
                ) : (
                  notifications.map(n => (
                    <div key={n.id} className="py-2.5 flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-espresso">{n.title}</p>
                        <p className="text-[11px] text-secondary mt-0.5">{n.desc}</p>
                      </div>
                      <button
                        onClick={() => removeNotification(n.id)}
                        className="text-secondary/60 hover:text-espresso text-[11px]"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA */}
        <button
          onClick={() => openModal('newOrder')}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-primary text-white hover:bg-espresso font-semibold text-xs shadow-sm hover:shadow transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[17px]">add</span>
          <span className="hidden sm:inline">Create Order</span>
        </button>

        {/* Chef Avatar */}
        <div className="flex items-center pl-1 border-l border-border ml-1">
          <img
            src={BRAND_CONFIG.logo}
            alt="Chef Rasool"
            className="w-8 h-8 rounded-full object-cover ring-2 ring-border ml-1 sm:ml-2"
          />
        </div>
      </div>
    </header>
  );
};
