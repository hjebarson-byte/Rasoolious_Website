import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { getCartCount, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop All', path: '/shop' },
    { label: 'Brownies', path: '/shop?category=Brownies' },
    { label: 'Cakes', path: '/shop?category=Cakes' },
    { label: 'Cookies', path: '/shop?category=Cookies' },
    { label: 'Gift Boxes', path: '/shop?category=Gift+Boxes' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Announcement Bar */}
      <div className="bg-chocolate-900 text-cream-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-chocolate-800">
        <Sparkles className="w-3.5 h-3.5 text-caramel-400" />
        <span>{BRAND_CONFIG.announcement}</span>
      </div>

      {/* Main Navbar */}
      <nav
        className={`px-4 sm:px-6 lg:px-10 transition-all duration-300 ${
          isScrolled
            ? 'bg-cream-50/95 backdrop-blur-md shadow-soft py-3 border-b border-cream-200/80'
            : 'bg-cream-50/80 backdrop-blur-sm py-4 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="p-2 text-chocolate-900 hover:text-caramel-600 focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search bakery treats"
              className="p-2 text-chocolate-900 hover:text-caramel-600 focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 group transition-transform hover:scale-[1.02]"
          >
            <div className="relative shrink-0">
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.shortName}
                className="w-12 h-12 rounded-2xl object-contain bg-white p-0.5 shadow-soft border border-caramel-300 group-hover:border-caramel-500 transition-colors"
                loading="eager"
              />
              <span className="absolute -bottom-1 -right-1 text-xs">✨</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xl sm:text-2xl font-serif font-black tracking-wide text-chocolate-950 leading-tight">
                {BRAND_CONFIG.shortName}
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase text-caramel-600 font-semibold font-sans">
                {BRAND_CONFIG.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path.includes('category=') &&
                  location.search.includes(link.path.split('category=')[1]));

              return (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-caramel-600 relative py-1 ${
                    isActive ? 'text-caramel-600 font-semibold' : 'text-chocolate-800'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-caramel-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Trigger */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search treats"
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cream-100 hover:bg-cream-200 text-chocolate-700 text-xs font-medium border border-cream-300 transition-colors"
            >
              <Search className="w-3.5 h-3.5 text-chocolate-500" />
              <span>Search treats...</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              aria-label="View Wishlist"
              className="relative p-2.5 rounded-full text-chocolate-800 hover:text-rose-600 hover:bg-cream-100 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Cart"
              className="relative p-2.5 rounded-full bg-chocolate-900 text-cream-50 hover:bg-caramel-600 transition-colors shadow-soft-sm flex items-center gap-1.5"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold px-1">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay Modal */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search treats"
          className="fixed inset-0 z-50 bg-chocolate-950/60 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl border border-cream-200"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-6 h-6 text-caramel-600 absolute left-4" />
              <input
                type="text"
                autoFocus
                placeholder="Search brownies, cakes, cookies, biscoff, pecan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-cream-50 text-chocolate-900 placeholder:text-chocolate-400 border border-cream-300 focus:outline-none focus:ring-2 focus:ring-caramel-400 text-base md:text-lg"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-4 p-1 text-chocolate-400 hover:text-chocolate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-cream-100 flex flex-wrap items-center gap-2 text-xs text-chocolate-600">
              <span className="font-semibold text-chocolate-800">Popular:</span>
              {['Fudge Brownie', 'Red Velvet', 'Biscoff', 'NYC Cookie', 'Cheesecake'].map(
                (term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => {
                      navigate(`/shop?q=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                    }}
                    className="px-3 py-1 rounded-full bg-cream-100 hover:bg-caramel-100 text-chocolate-700 transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Slide-in Drawer */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 bg-chocolate-950/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="w-4/5 max-w-sm h-full bg-cream-50 p-6 flex flex-col justify-between shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-cream-200">
                <div className="flex items-center gap-3">
                  <img
                    src={BRAND_CONFIG.logo}
                    alt={BRAND_CONFIG.shortName}
                    className="w-12 h-12 rounded-2xl object-contain bg-white p-0.5 border border-caramel-300 shadow-sm"
                    loading="eager"
                  />
                  <div>
                    <h3 className="font-serif text-lg font-bold tracking-wider text-chocolate-950">
                      {BRAND_CONFIG.shortName}
                    </h3>
                    <p className="text-[10px] text-caramel-600 font-semibold tracking-wider uppercase">
                      {BRAND_CONFIG.tagline}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-full text-chocolate-700 hover:bg-cream-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="flex items-center justify-between text-base font-medium text-chocolate-900 hover:text-caramel-600 py-1"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-chocolate-400" />
                  </Link>
                ))}
                <Link
                  to="/wishlist"
                  className="flex items-center justify-between text-base font-medium text-chocolate-900 hover:text-caramel-600 py-1"
                >
                  <span>My Wishlist ({wishlistCount})</span>
                  <Heart className="w-4 h-4 text-rose-600" />
                </Link>
              </div>
            </div>

            {/* Mobile Footer Info */}
            <div className="pt-6 border-t border-cream-200 text-xs text-chocolate-600 space-y-2">
              <p className="font-semibold text-chocolate-900">
                Fresh Studio Bakes
              </p>
              <p>{BRAND_CONFIG.contact.phone}</p>
              <p>{BRAND_CONFIG.contact.hours}</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
