import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ArrowRight, Award, Flame } from 'lucide-react';

export const OurStory: React.FC = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-20 bg-[#FDFBF7] text-chocolate-950 font-sans selection:bg-caramel-300 selection:text-chocolate-950">
      
      {/* ================= 1. HERO HEADER ================= */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-stone-200/80 bg-gradient-to-b from-[#F7F2EB] to-[#FDFBF7]">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-caramel-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel-100 text-chocolate-900 border border-caramel-300 text-xs font-semibold tracking-wider uppercase shadow-xs">
            <Heart className="w-3.5 h-3.5 text-caramel-600 fill-caramel-600" />
            <span>The Origin of Rasoolicious</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-chocolate-950 leading-tight">
            It started with a brownie. <br />
            <span className="italic font-serif text-caramel-700">It became a love story.</span>
          </h1>

          <p className="font-serif italic text-lg sm:text-xl text-chocolate-700 max-w-2xl mx-auto leading-relaxed">
            "From the very first batch made for one special person, to the confections we now bake fresh for you every morning."
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
                alt="Artisan chocolate brownie baking with love"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-serif font-bold text-base block text-caramel-300">Handcrafted in Small Batches</span>
                <span>Baked with pure Belgian chocolate & French cultured butter.</span>
              </div>
            </div>

            {/* Floating Gold Quote Pill */}
            <div className="absolute -bottom-6 -right-6 hidden sm:flex items-center gap-3 bg-white p-4 rounded-2xl shadow-xl border border-stone-200">
              <div className="w-10 h-10 rounded-xl bg-caramel-500 text-white flex items-center justify-center font-serif text-lg font-bold">
                R
              </div>
              <div className="text-left text-xs">
                <div className="font-bold text-chocolate-950">Where Love Meets Deliciousness</div>
                <div className="text-stone-500">Founded with passion</div>
              </div>
            </div>
          </div>

          {/* Right Narrative Story */}
          <div className="lg:col-span-7 space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed">
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-chocolate-950 font-medium leading-relaxed">
                <strong className="text-caramel-700 font-serif text-xl sm:text-2xl font-bold block mb-1">
                  About Rasoolicious
                </strong>
                Rasoolicious began with something simple — a batch of brownies made for my wife, <strong>Rasool</strong>. It was the very first thing I ever made for her, and she loved them so much that I kept making them again and again.
              </p>

              <p>
                What started as a small gesture of love slowly became a passion for creating brownies that bring the exact same feeling of warmth, joy, and comfort to everyone who tastes them.
              </p>

              <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-caramel-800 font-bold font-serif text-base">
                  <Sparkles className="w-4 h-4 text-caramel-600" />
                  <span>The Meaning Behind the Name</span>
                </div>
                <p className="text-stone-800 text-sm leading-relaxed">
                  The name <strong>Rasoolicious</strong> is inspired by two ideas close to our hearts: <br />
                  <span className="block mt-1 font-semibold text-chocolate-950">
                    • <em>“Rasool”</em> means <strong>Messenger</strong>. <br />
                    • <em>“Delicious”</em> represents <strong>Great Taste</strong>.
                  </span>
                  Together, Rasoolicious represents our lifelong desire to be a <strong>messenger of deliciousness</strong> — sharing happiness, love, and unforgettable taste through every brownie.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. WHY RASOOLICIOUS & PHILOSOPHY ================= */}
      <section className="py-16 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">Our Core Philosophy</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-chocolate-950">
              Why Rasoolicious?
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              We believe a great brownie should be more than just a dessert. It should be an experience — rich, indulgent, comforting, and made with Care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-caramel-100 text-caramel-700 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 fill-caramel-600 text-caramel-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate-950">Make it with Love</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                From the first batch made for one special person to the brownies we now share with the world, love is our secret ingredient.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                <Flame className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate-950">Make it Delicious</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                70% single-origin Callebaut Belgian dark chocolate, French butter, and that unmistakable crinkly crust with a molten fudgy heart.
              </p>
            </div>

            <div className="p-6 sm:p-8 rounded-3xl bg-stone-50 border border-stone-200/90 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-serif font-bold text-lg text-chocolate-950">Make it Memorable</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Whether you're treating yourself, celebrating a special moment, or surprising someone you adore, we make every bite count.
              </p>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-chocolate-950 text-cream-50 text-center space-y-4 shadow-xl border border-chocolate-850">
            <h3 className="font-serif text-2xl sm:text-3xl text-caramel-300 font-normal">
              One brownie. One story. One delicious feeling.
            </h3>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              At Rasoolicious, every brownie is made with meticulous attention to quality, freshness, rich chocolate flavour, and that perfect balance of fudgy texture and deliciousness.
            </p>
          </div>

        </div>
      </section>

      {/* ================= 4. WELCOME & INVITATION CALL TO ACTION ================= */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">The Rasoolicious Promise</span>
        
        <h2 className="font-serif text-3xl sm:text-5xl text-chocolate-950 leading-tight">
          Welcome to Rasoolicious <br />
          <span className="italic font-serif text-caramel-700">Where Love Meets Deliciousness.</span>
        </h2>

        <p className="text-stone-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Craving something irresistibly chocolatey? Explore our oven-fresh handcrafted slabs and taste the love for yourself.
        </p>

        <div className="pt-4 flex flex-wrap justify-center items-center gap-4">
          <Link
            to="/shop"
            className="px-8 py-3.5 rounded-full bg-caramel-500 hover:bg-caramel-600 text-white font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Explore The Brownie Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-6 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-chocolate-900 font-semibold text-sm transition-all border border-stone-300"
          >
            Back to Home
          </Link>
        </div>
      </section>

    </div>
  );
};
