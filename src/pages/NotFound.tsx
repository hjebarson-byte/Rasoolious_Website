import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="pt-36 pb-24 min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-cream-50">
      <div className="text-6xl mb-4">🍪</div>
      <span className="text-xs font-bold uppercase tracking-widest text-caramel-600 mb-2">
        Error 404
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-chocolate-950 font-normal mb-3">
        Looks like this crumb went missing.
      </h1>
      <p className="text-chocolate-600 text-sm sm:text-base max-w-sm mb-8 leading-relaxed">
        The page you are looking for has already been eaten or does not exist in our kitchen.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          to="/"
          className="px-6 py-3.5 rounded-full bg-chocolate-900 text-cream-50 text-xs font-semibold uppercase tracking-wider hover:bg-caramel-600 transition-colors shadow-soft flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3.5 rounded-full bg-cream-100 text-chocolate-900 text-xs font-semibold uppercase tracking-wider hover:bg-cream-200 transition-colors flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Browse Fresh Treats</span>
        </Link>
      </div>
    </div>
  );
};
