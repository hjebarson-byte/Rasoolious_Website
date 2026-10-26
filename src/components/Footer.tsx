import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND_CONFIG } from '../config/brand';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-chocolate-950 text-cream-200 pt-16 pb-12 border-t border-chocolate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-chocolate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              <img
                src={BRAND_CONFIG.logo}
                alt={BRAND_CONFIG.name}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-caramel-500/40 shadow-soft bg-white p-0.5"
              />
              <div>
                <span className="text-2xl font-serif font-black tracking-widest text-cream-50 uppercase">
                  {BRAND_CONFIG.name}
                </span>
                <p className="text-xs uppercase tracking-widest text-caramel-400 font-semibold mt-0.5">
                  {BRAND_CONFIG.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-chocolate-300 max-w-sm leading-relaxed">
              Handcrafted in small batches using 70% single-origin Belgian chocolate, French cultured butter, and pure organic vanilla. No shortcuts, no artificial preservatives.
            </p>

            <div className="space-y-2 text-xs text-chocolate-300 pt-2">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-caramel-400 shrink-0 mt-0.5" />
                <span>{BRAND_CONFIG.contact.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-caramel-400 shrink-0" />
                <span>{BRAND_CONFIG.contact.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-caramel-400 shrink-0" />
                <span>{BRAND_CONFIG.contact.email}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-caramel-400 shrink-0" />
                <span>{BRAND_CONFIG.contact.hours}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <a
                href={BRAND_CONFIG.social.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-chocolate-900 hover:bg-caramel-500 text-cream-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={BRAND_CONFIG.social.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-chocolate-900 hover:bg-caramel-500 text-cream-100 flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-caramel-400 uppercase">
              Shop Treats
            </h4>
            <ul className="space-y-2 text-sm text-chocolate-300">
              <li>
                <Link to="/shop?category=Brownies" className="hover:text-cream-50 transition-colors">
                  Fudge Brownies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Cakes" className="hover:text-cream-50 transition-colors">
                  Celebration Cakes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Cookies" className="hover:text-cream-50 transition-colors">
                  Monster NYC Cookies
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Gift+Boxes" className="hover:text-cream-50 transition-colors">
                  Curated Gift Boxes
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Specials" className="hover:text-cream-50 transition-colors">
                  Seasonal Specials
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-caramel-400 uppercase">
              The Bakery
            </h4>
            <ul className="space-y-2 text-sm text-chocolate-300">
              <li>
                <Link to="/#about" className="hover:text-cream-50 transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link to="/#why-us" className="hover:text-cream-50 transition-colors">
                  Ingredients Sourcing
                </Link>
              </li>
              <li>
                <Link to="/#testimonials" className="hover:text-cream-50 transition-colors">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="hover:text-cream-50 transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/#custom-orders" className="hover:text-cream-50 transition-colors">
                  Custom Event Catering
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Policies Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-caramel-400 uppercase">
              Help & Care
            </h4>
            <ul className="space-y-2 text-sm text-chocolate-300">
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Freshness & Storage Guide
                </span>
              </li>
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Allergen Advisory
                </span>
              </li>
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Delivery & Packaging
                </span>
              </li>
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Refund & Cancellation
                </span>
              </li>
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-cream-50 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-chocolate-400 gap-4">
          <p>© 2026 {BRAND_CONFIG.name}. Handcrafted with love and lots of chocolate.</p>
          <div className="flex items-center gap-6">
            <span>Free Shipping Over ₹999</span>
            <span>100% Secure Checkout</span>
            <span>Bake-to-Order Freshness</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
