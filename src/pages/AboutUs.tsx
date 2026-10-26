import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Award, Flame, Sparkles, ArrowRight, MapPin } from 'lucide-react';

export const AboutUs: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FDFBF7] text-chocolate-950 font-sans selection:bg-caramel-300 selection:text-chocolate-950">
      
      {/* ================= 1. HERO BANNER ================= */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-stone-200/80 bg-gradient-to-b from-[#F7F2EB] to-[#FDFBF7]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-caramel-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel-100 text-chocolate-900 border border-caramel-300 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-caramel-600" />
            <span>The Brownie Atelier & Philosophy</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-chocolate-950 leading-tight">
            Welcome to Rasoolicious <br />
            <span className="italic font-serif text-caramel-700">Where Love Meets Deliciousness.</span>
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-chocolate-700 max-w-2xl mx-auto leading-relaxed">
            "We believe a great brownie should be more than just a dessert. It should be an experience — rich, indulgent, comforting, and made with Care."
          </p>
        </div>
      </section>

      {/* ================= 2. WHY RASOOLICIOUS ================= */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel-600 block">
              Our Culinary Purpose
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl text-chocolate-950 leading-tight font-medium">
              Why Rasoolicious?
            </h2>

            <p className="text-base sm:text-lg text-chocolate-900 font-medium leading-relaxed">
              At Rasoolicious, every brownie is made with meticulous attention to quality, freshness, rich chocolate flavour, and that perfect balance of fudgy texture and deliciousness.
            </p>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              From the very first batch made for one special person to the brownies we now want to share with the world, our philosophy remains the same:
            </p>

            <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3 font-serif text-base sm:text-lg text-chocolate-950 italic">
              <p>“Make it with love.”</p>
              <p>“Make it delicious.”</p>
              <p>“Make every bite memorable.”</p>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-chocolate-900">
              <img
                src="https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80"
                alt="Rasoolicious Signature Brownie Slab with gloss crinkle"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-serif font-bold text-base block text-caramel-300">70% Callebaut Dark Couverture</span>
                <span>Paper-thin crinkle crust with dense molten core.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Craft */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Heart className="w-6 h-6 fill-rose-600 text-rose-600" />
            </div>
            <h3 className="font-serif font-bold text-xl text-chocolate-950">Make it with Love</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Every brownie is hand-folded and monitored in our deck ovens with the exact same passion as the original batch baked for Rasool.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Flame className="w-6 h-6 text-amber-600" />
            </div>
            <h3 className="font-serif font-bold text-xl text-chocolate-950">Make it Delicious</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Only single-origin 70% Callebaut chocolate, French cultured butter, and pure cane sugar. Zero palm oil, zero compromises.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-stone-200/90 space-y-4 shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="font-serif font-bold text-xl text-chocolate-950">Make it Memorable</h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              From our custom wax-sealed gold parchment cards to warm doorstep dispatches, every element is designed to spark pure joy.
            </p>
          </div>
        </div>

      </section>

      {/* ================= 3. MADE FOR EVERY MOMENT ================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">Pure Indulgence</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-chocolate-950">
              Made to Make Your Moment a Little Sweeter
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Whatever the occasion, Rasoolicious brownies are baked to elevate the experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Treating Yourself',
                desc: 'A quiet evening with a warm molten slab and a cup of freshly brewed coffee.',
                badge: 'Self Care'
              },
              {
                title: 'Surprising Someone You Love',
                desc: 'An unexpected box of warm brownies arriving with a personal handwritten message.',
                badge: 'With Love'
              },
              {
                title: 'Celebrating Moments',
                desc: 'Milestones, birthdays, anniversaries, and family dinners that deserve the best.',
                badge: 'Celebrations'
              },
              {
                title: 'Irresistible Cravings',
                desc: 'When only deep, dark, authentic 70% chocolate fudge will hit the spot.',
                badge: 'Pure Craving'
              }
            ].map((card, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3 shadow-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-caramel-700 bg-caramel-100/60 px-2.5 py-1 rounded-full inline-block">
                  {card.badge}
                </span>
                <h3 className="font-serif font-bold text-lg text-chocolate-950">{card.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Kanniyakumari Atelier Hub Note */}
          <div className="p-8 rounded-3xl bg-[#FAF6F0] border border-stone-200/90 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-caramel-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-lg text-chocolate-950">Our Kanniyakumari Atelier</h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  Located in Marthandam, baking small fresh morning batches for prompt courier delivery across the district.
                </p>
              </div>
            </div>
            <Link
              to="/our-story"
              className="px-5 py-2.5 rounded-full bg-white hover:bg-stone-50 text-chocolate-900 border border-stone-300 text-xs font-semibold whitespace-nowrap shadow-xs inline-flex items-center gap-2"
            >
              <span>Read The Love Story</span>
              <ArrowRight className="w-3.5 h-3.5 text-caramel-600" />
            </Link>
          </div>

        </div>
      </section>

      {/* ================= 4. CLOSING INVITATION ================= */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">Taste The Difference</span>
        
        <h2 className="font-serif text-3xl sm:text-5xl text-chocolate-950 leading-tight">
          One brownie. One story. <br />
          <span className="italic font-serif text-caramel-700">One delicious feeling.</span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Order your freshly baked artisanal brownie slab today and experience where love meets deliciousness.
        </p>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-caramel-500 hover:bg-caramel-600 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore All Brownie Slabs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/our-story"
            className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-chocolate-900 font-semibold text-sm transition-all border border-stone-300"
          >
            The Love Story
          </Link>
        </div>
      </section>

    </div>
  );
};
