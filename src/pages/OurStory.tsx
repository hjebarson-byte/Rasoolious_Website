import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FDFBF7] text-chocolate-950 font-sans selection:bg-caramel-300 selection:text-chocolate-950">
      
      {/* ================= 1. HERO HEADER ================= */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-stone-200/80 bg-gradient-to-b from-[#F7F2EB] to-[#FDFBF7]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-caramel-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-900 border border-rose-200 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Heart className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
            <span>The Personal Love Story</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-chocolate-950 leading-tight">
            It started with a brownie. <br />
            <span className="italic font-serif text-caramel-700">It became a love story.</span>
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-chocolate-700 max-w-2xl mx-auto leading-relaxed">
            "A small gesture of love that slowly blossomed into a lifelong passion for perfection."
          </p>
        </div>
      </section>

      {/* ================= 2. THE LOVE STORY NARRATIVE ================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Photo Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-chocolate-900 aspect-[4/5]">
              <img
                src="https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80"
                alt="The first batch of brownies baked for Rasool"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-serif font-bold text-base block text-caramel-300">The First Batch</span>
                <span>Baked with devotion in our home kitchen for one special person.</span>
              </div>
            </div>

            {/* Floating Gold Quote Pill */}
            <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-caramel-500 text-white flex items-center justify-center font-serif text-lg font-bold">
                R
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-chocolate-950">A Love Story in Every Bite</div>
                <div className="text-stone-500">Chef Rasool & Rasool</div>
              </div>
            </div>
          </div>

          {/* Right Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel-600 block">
                Chapter 01 • The Beginning
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl text-chocolate-950 font-medium">
                Made for the one I love.
              </h2>

              <p className="text-base sm:text-lg text-chocolate-950 font-medium leading-relaxed">
                Rasoolicious began with something simple — a batch of brownies made for my wife, <strong>Rasool</strong>. It was the very first thing I ever made for her, and she loved them so much that I kept making them again and again.
              </p>

              <p>
                What started as a small gesture of love slowly became a passion for creating brownies that bring the exact same feeling to everyone who tastes them.
              </p>

              <p>
                Every time the aroma of melting Belgian chocolate and brown butter filled the kitchen, it was a reminder that the best things in life are crafted with heartfelt devotion.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. THE NAME BREAKDOWN ================= */}
      <section className="py-16 sm:py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">Chapter 02 • The Meaning</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-chocolate-950">
              The Meaning Behind Rasoolicious
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              The name Rasoolicious is inspired by two ideas close to our hearts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200/90 text-center space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel-700 block">The Name</span>
              <div className="font-serif text-3xl text-chocolate-950 font-bold">“Rasool”</div>
              <div className="text-sm font-semibold text-caramel-800">The Messenger</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Named after my beloved wife Rasool, honoring the sacred meaning of the word — a messenger sent with glad tidings and sincere affection.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-amber-50/60 border border-amber-200/90 text-center space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-widest text-caramel-700 block">The Taste</span>
              <div className="font-serif text-3xl text-chocolate-950 font-bold">“Delicious”</div>
              <div className="text-sm font-semibold text-caramel-800">Unforgettable Flavour</div>
              <p className="text-xs text-stone-600 leading-relaxed">
                Representing great taste, rich chocolate indulgence, and that perfect moment when pure cocoa meets your tongue.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#1C100B] text-cream-50 text-center space-y-2 border border-chocolate-850 shadow-md">
            <div className="flex items-center justify-center gap-2 text-caramel-300 font-serif font-bold text-lg sm:text-xl">
              <Sparkles className="w-5 h-5 text-caramel-400" />
              <span>The Messenger of Deliciousness</span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
              Together, Rasoolicious represents our desire to be a <strong>messenger of deliciousness</strong> — sharing happiness, love, and unforgettable taste through every brownie.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 4. CLOSING REFLECTION & TRANSITION ================= */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">The Journey Continues</span>

        <h2 className="font-serif text-3xl sm:text-5xl text-chocolate-950 leading-tight">
          One brownie. One story. <br />
          <span className="italic font-serif text-caramel-700">One delicious feeling.</span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          From the first batch made for one special person to the brownies we now share across Kanniyakumari, the devotion remains unchanged.
        </p>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/about"
            className="px-8 py-3.5 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Learn About Our Craft & Atelier</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-chocolate-900 font-semibold text-sm transition-all border border-stone-300"
          >
            Explore Brownies
          </Link>
        </div>
      </section>

    </div>
  );
};
