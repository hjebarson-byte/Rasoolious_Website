import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 700);
  };

  return (
    <section className="relative py-16 md:py-24 bg-cream-200/50 overflow-hidden border-t border-cream-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-caramel-100 border border-caramel-300 text-caramel-600 flex items-center justify-center mx-auto mb-4 shadow-soft-sm">
          <Mail className="w-6 h-6" />
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-chocolate-950 font-medium tracking-tight mb-3">
          Get first dibs on fresh bakes.
        </h2>

        <p className="text-chocolate-600 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Be the first to hear about seasonal limited drops, secret test-kitchen batches, and unlock an instant <span className="font-semibold text-chocolate-900">10% welcome coupon</span> on your first order.
        </p>

        {status === 'success' ? (
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-sm font-medium">
              You're on the list! Check your inbox for code <span className="font-bold underline">RASOOL10</span>.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                disabled={status === 'loading'}
                className="flex-1 px-5 py-3.5 rounded-full bg-white border border-caramel-200 text-chocolate-900 placeholder:text-chocolate-400 focus:outline-none focus:ring-2 focus:ring-caramel-500 shadow-soft-sm text-sm"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-7 py-3.5 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 font-semibold text-sm transition-all duration-200 shadow-soft active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{status === 'loading' ? 'Joining...' : 'Subscribe'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'error' && (
              <p className="text-rose-600 text-xs mt-2 text-left sm:text-center">
                {errorMessage}
              </p>
            )}

            <p className="text-[11px] text-chocolate-400 mt-3">
              No spam, ever. Only chocolate news and occasional special treats.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
