import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AdminProvider } from './admin/context/AdminContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { Ambient3DParticles } from './components/Ambient3DParticles';
import { RasooliciousLoader } from './components/RasooliciousLoader';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderSuccess } from './pages/OrderSuccess';
import { Wishlist } from './pages/Wishlist';
import { OurStory } from './pages/OurStory';
import { AboutUs } from './pages/AboutUs';
import { NotFound } from './pages/NotFound';
import { AdminApp } from './admin/AdminApp';

// Auto scroll to top on route transition
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-chocolate-900 font-sans selection:bg-caramel-300 selection:text-chocolate-950 relative">
      <ScrollToTop />
      
      {/* Ambient 3D floating cocoa & golden crumb atmosphere */}
      <Ambient3DParticles />

      {/* Sticky/Fixed Navigation */}
      <Navbar />

      {/* Slide-out Cart Drawer */}
      <CartDrawer />

      {/* Main Page Views */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Boutique Footer */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show high-end branded bakery intro for 1.2s on initial visit
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AdminProvider>
        <CartProvider>
          <WishlistProvider>
            {/* Branded Rasoolicious Splash Loader (Storefront) */}
            <AnimatePresence>
              {initialLoading && (
                <motion.div
                  key="splash-loader"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <RasooliciousLoader variant="fullscreen" />
                </motion.div>
              )}
            </AnimatePresence>

            <AppRoutes />
          </WishlistProvider>
        </CartProvider>
      </AdminProvider>
    </Router>
  );
};

export default App;
