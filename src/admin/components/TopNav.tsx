import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, 
  Search, 
  ShieldCheck, 
  Calendar, 
  Bell, 
  ChevronDown, 
  ExternalLink, 
  LogOut, 
  Sliders, 
  Flame, 
  Truck, 
  AlertTriangle 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import type { UserRole } from '../types/adminTypes';

export const TopNav: React.FC = () => {
  const { 
    setSidebarOpen, 
    activeRole, 
    setActiveRole, 
    setCurrentScreen, 
    notifications, 
    removeNotification, 
    showToast,
    orders,
    products,
    openOrderDrawer
  } = useAdmin();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
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
          o.locality.toLowerCase().includes(searchQuery.toLowerCase())
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
    <header className="sticky top-0 z-40 bg-white text-chocolate-950 border-b border-stone-200/90 shadow-xs">
      <div className="flex items-center justify-between px-3.5 sm:px-6 py-2.5 gap-2 sm:gap-4">
        
        {/* Left: Brand & Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(prev => !prev)}
            className="p-1.5 rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            title="Toggle Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div
            onClick={() => setCurrentScreen('overview')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-caramel-400 to-caramel-600 text-white flex items-center justify-center font-serif font-black text-lg shadow-sm">
              R
            </div>
            <div className="hidden sm:block">
              <span className="font-serif font-bold text-base tracking-wider text-chocolate-950 group-hover:text-caramel-600 transition-colors">
                Rasolicious
              </span>
              <span className="block text-[10px] text-caramel-600 uppercase tracking-widest font-semibold -mt-0.5">
                Admin Atelier • TN
              </span>
            </div>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="flex-1 max-w-md relative hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              ref={searchRef}
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              placeholder="Search orders, brownies, customers, Marthandam..."
              className="w-full bg-stone-50 text-chocolate-900 placeholder-stone-400 text-xs sm:text-sm pl-9 pr-14 py-2 rounded-xl border border-stone-200 focus:bg-white focus:outline-none focus:border-caramel-500 focus:ring-1 focus:ring-caramel-500 transition-all"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] bg-stone-200 text-stone-600 px-1.5 py-0.5 rounded font-mono font-medium border border-stone-300">
              ⌘K
            </div>
          </div>

          {/* Quick Search Results Dropdown */}
          {searchFocused && searchQuery.trim() && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-stone-200 rounded-xl shadow-xl overflow-hidden z-50 text-xs">
              {matchedOrders.length === 0 && matchedProducts.length === 0 ? (
                <div className="p-3 text-stone-500 text-center">No orders or treats found matching "{searchQuery}"</div>
              ) : (
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                  {matchedOrders.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] uppercase font-bold text-caramel-600 px-2 py-1">Matching Orders</div>
                      {matchedOrders.map(ord => (
                        <button
                          key={ord.id}
                          onClick={() => {
                            openOrderDrawer(ord);
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 flex items-center justify-between text-chocolate-900 group transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-caramel-600 mr-2">{ord.id}</span>
                            <span>{ord.customerName}</span>
                            <span className="text-[11px] text-stone-500 ml-2">({ord.locality})</span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-chocolate-800">₹{ord.total}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {matchedProducts.length > 0 && (
                    <div className="p-2">
                      <div className="text-[10px] uppercase font-bold text-caramel-600 px-2 py-1">Matching Treats</div>
                      {matchedProducts.map(prod => (
                        <button
                          key={prod.id}
                          onClick={() => {
                            setCurrentScreen('inventory');
                            setSearchQuery('');
                          }}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-stone-50 flex items-center justify-between text-chocolate-900 group transition-colors"
                        >
                          <div>
                            <span className="font-semibold text-chocolate-900">{prod.name}</span>
                            <span className="text-[10px] text-stone-500 ml-2">[{prod.category}]</span>
                          </div>
                          <span className="text-[10px] text-emerald-600 font-mono font-bold">₹{prod.price}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Section: Role Simulator, Date, Notifications, Store Link & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Active Role Simulator Pill */}
          <div className="hidden lg:flex items-center gap-1.5 bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-xl text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-caramel-600" />
            <span className="text-stone-500 text-[11px]">Role:</span>
            <select
              value={activeRole}
              onChange={e => {
                const newRole = e.target.value as UserRole;
                setActiveRole(newRole);
                showToast(`Switched active role simulator to ${newRole}`, 'info');
              }}
              className="bg-transparent text-chocolate-900 font-semibold text-xs focus:outline-none cursor-pointer"
            >
              <option value="Super Admin" className="bg-white text-chocolate-900">Super Admin</option>
              <option value="Admin" className="bg-white text-chocolate-900">Admin</option>
              <option value="Kitchen Staff" className="bg-white text-chocolate-900">Kitchen Staff</option>
              <option value="User" className="bg-white text-chocolate-900">User</option>
            </select>
          </div>

          {/* Current Date Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-600 bg-stone-50 px-2.5 py-1 rounded-xl border border-stone-200">
            <Calendar className="w-3.5 h-3.5 text-caramel-600" />
            <span>Tuesday, 13 Oct 2026</span>
          </div>

          {/* Storefront Link Button */}
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 text-chocolate-800 border border-stone-200 transition-all shadow-xs"
            title="Open Customer Storefront in New Tab"
          >
            <span className="hidden sm:inline">Storefront</span>
            <ExternalLink className="w-3.5 h-3.5 text-caramel-600" />
          </Link>

          {/* Notifications Bell */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(prev => !prev)}
              className="relative p-2 rounded-xl text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-colors"
              title="Notifications & Alerts"
            >
              <Bell className="w-4 h-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-terracotta-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-pulse">
                  {notifications.length}
                </span>
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs">
                <div className="p-3 border-b border-stone-100 bg-stone-50 flex items-center justify-between">
                  <span className="font-bold text-chocolate-950 font-serif text-sm">Bakery Alerts & Dispatches</span>
                  <span className="text-[10px] bg-terracotta-100 text-terracotta-700 px-2 py-0.5 rounded-full font-semibold">
                    {notifications.length} live
                  </span>
                </div>
                <div className="divide-y divide-stone-100 max-h-72 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-stone-400">All alerts cleared</div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => {
                          setCurrentScreen(n.screen);
                          setNotificationsOpen(false);
                        }}
                        className="p-3 hover:bg-stone-50 cursor-pointer flex items-start gap-2.5 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-stone-100 border border-stone-200 shrink-0 mt-0.5">
                          {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                          {n.type === 'oven' && <Flame className="w-4 h-4 text-terracotta-500" />}
                          {n.type === 'dispatch' && <Truck className="w-4 h-4 text-caramel-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-chocolate-900 group-hover:text-caramel-600 transition-colors">
                            {n.title}
                          </p>
                          <p className="text-[11px] text-stone-500 mt-0.5 leading-snug">
                            {n.desc}
                          </p>
                        </div>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            removeNotification(n.id);
                          }}
                          className="text-stone-400 hover:text-stone-700 p-1 text-xs"
                          title="Dismiss"
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

          {/* Admin Profile Pill & Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(prev => !prev)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 transition-all text-left"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-caramel-500 to-caramel-600 text-white font-bold text-xs flex items-center justify-center font-serif shadow-xs">
                CR
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-bold text-chocolate-950 leading-tight">Chef Rasool</div>
                <div className="text-[10px] text-caramel-600 font-medium leading-tight">{activeRole} • Owner</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400 ml-1 hidden sm:block" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-200 rounded-2xl shadow-2xl z-50 overflow-hidden text-xs py-1">
                <div className="px-3.5 py-2.5 border-b border-stone-100 bg-stone-50">
                  <div className="font-bold text-chocolate-950">Signed in as Chef Rasool</div>
                  <div className="text-[11px] text-caramel-600 font-medium">admin@rasolicious.com</div>
                </div>

                <button
                  onClick={() => {
                    setCurrentScreen('delivery-slots');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-stone-50 text-chocolate-800 flex items-center gap-2.5 transition-colors"
                >
                  <Sliders className="w-4 h-4 text-caramel-600" />
                  <span>Delivery Rates & Pincodes</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentScreen('roles');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-stone-50 text-chocolate-800 flex items-center gap-2.5 transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-caramel-600" />
                  <span>Role Permissions Matrix</span>
                </button>

                <div className="border-t border-stone-100 my-1"></div>

                <button
                  onClick={() => {
                    showToast('Admin session refreshed', 'info');
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2.5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out Session</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
