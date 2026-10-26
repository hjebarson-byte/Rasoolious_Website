import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Award, 
  HeartHandshake, 
  Truck, 
  Star, 
  ShoppingBag,
  Flame,
  CheckCircle2,
  Heart
} from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { PRODUCTS, CATEGORIES_LIST, TESTIMONIALS, INSTAGRAM_POSTS } from '../data/products';
import type { Product } from '../types';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { ProductQuickView } from '../components/ProductQuickView';
import { Newsletter } from '../components/Newsletter';
import { HeroShowcase } from '../components/HeroShowcase';
import { ScrollVideoStory } from '../components/ScrollVideoStory';

export const Home: React.FC = () => {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter specific product sets
  const bestSellers = PRODUCTS.filter((p) => p.badge === 'BEST SELLER').slice(0, 4);
  const signatureBrownies = PRODUCTS.slice(0, 4);
  const moltenBrownies = PRODUCTS.filter((p) => p.category === 'Molten Centers' || p.category === 'Classic Fudgy').slice(0, 6);

  return (
    <div className="pt-24 sm:pt-28">
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative overflow-hidden min-h-[85vh] lg:min-h-[88vh] flex items-center bg-gradient-to-b from-cream-100/70 via-cream-50 to-warmwhite border-b border-cream-200">
        {/* Soft background ambient glow */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-caramel-200/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-caramel-300/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-caramel-100/80 border border-caramel-300/60 text-chocolate-800 text-xs font-semibold tracking-wider uppercase shadow-soft-sm">
                <Sparkles className="w-3.5 h-3.5 text-caramel-600" />
                <span>Small Batch Artisanal Brownies</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-chocolate-950 font-normal leading-[1.08] tracking-tight">
                Baked to make <br className="hidden sm:inline" />
                <span className="italic font-serif font-medium text-caramel-600">
                  your day better.
                </span>
              </h1>

              <p className="text-chocolate-600 text-base sm:text-lg max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                {BRAND_CONFIG.subheadline} Melt-in-the-mouth textures, single-origin Belgian chocolate, and pure butter warmth in every bite.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 font-semibold text-sm transition-all duration-300 shadow-soft hover:shadow-card-hover flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Treats</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#best-sellers"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-cream-100 text-chocolate-900 border border-cream-300 font-semibold text-sm transition-all duration-200 shadow-soft-sm flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-caramel-500" />
                  <span>Explore Best Sellers</span>
                </a>
              </div>

              {/* Social Proof Mini Bar */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-chocolate-600">
                <div className="flex items-center gap-1.5">
                  <div className="flex -space-x-1.5">
                    {['#70483c', '#8b5a2b', '#b3804d', '#c68b59'].map((c, i) => (
                      <span
                        key={i}
                        style={{ backgroundColor: c }}
                        className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold"
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="font-semibold text-chocolate-900">4.9 / 5.0</span>
                  <span className="text-chocolate-400">(1,400+ foodies)</span>
                </div>
                <span className="hidden sm:inline text-cream-400">•</span>
                <div className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Free shipping above ₹999</span>
                </div>
              </div>
            </div>

            {/* Hero Interactive Tasting Showcase */}
            <div className="lg:col-span-6 relative">
              <HeroShowcase />
            </div>

          </div>
        </div>
      </section>

      {/* ================= 1.5 CINEMATIC SCROLL VIDEO STORY ================= */}
      <ScrollVideoStory />

      {/* ================= 2. FEATURED CATEGORIES ================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          badge="Atelier Menu"
          title="Explore Our Brownie Collections"
          subtitle="From 70% Callebaut dark chocolate molten slabs to roasted walnut crunches, every brownie is baked in small daily batches."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-5">
          {CATEGORIES_LIST.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${encodeURIComponent(category.id)}`}
              className="group relative flex flex-col rounded-3xl overflow-hidden bg-white border border-cream-200 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1.5"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-cream-100 relative">
                <img
                  src={category.image}
                  alt={category.title}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-chocolate-950/20 to-transparent group-hover:from-chocolate-950/90 transition-colors" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-caramel-300 mb-0.5">
                    {category.count} items
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-medium leading-snug group-hover:text-caramel-200 transition-colors flex items-center justify-between">
                    <span>{category.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= 3. BEST SELLERS ================= */}
      <section id="best-sellers" className="py-16 md:py-24 bg-cream-100/60 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
            <div>
              <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-caramel-100 text-chocolate-800 border border-caramel-300">
                Customer Favorites
              </span>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-chocolate-900 leading-tight">
                Our Most Craved Treats
              </h2>
              <p className="mt-2 text-chocolate-600 text-sm sm:text-base">
                The recipes that put Rasoolicious on the map.
              </p>
            </div>
            <Link
              to="/shop?sort=best-selling"
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-caramel-600 hover:text-chocolate-900 transition-colors uppercase tracking-wider"
            >
              <span>View All Best Sellers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. SIGNATURE BROWNIE SPOTLIGHT ================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14">
          <div>
            <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-caramel-100 text-chocolate-800 border border-caramel-300">
              The Chocolate Craft
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-chocolate-900 leading-tight">
              Meet your new favourite brownie.
            </h2>
            <p className="mt-2 text-chocolate-600 text-sm sm:text-base max-w-xl">
              Thick paper-thin crinkle tops, dense fudgy interiors, and real European butter. Baked fresh every morning.
            </p>
          </div>
          <Link
            to="/shop"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-caramel-300 text-chocolate-800 text-xs font-semibold hover:bg-caramel-50 transition-colors shadow-soft-sm"
          >
            <span>View All Brownies (12)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureBrownies.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ================= 5. PROMOTIONAL BOX BUILDER BANNER ================= */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="relative rounded-4xl overflow-hidden bg-chocolate-900 text-cream-50 p-8 sm:p-12 lg:p-16 shadow-2xl border border-chocolate-800">
          {/* Subtle noise and warm glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-caramel-600/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <span className="px-3.5 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-caramel-500 text-white inline-block">
                Artisan Brownie Box
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-cream-50 leading-tight">
                Sweet box. Pure indulgence.
              </h2>
              <p className="text-chocolate-200 text-sm sm:text-base max-w-lg leading-relaxed">
                Build your own box of handcrafted brownies and save 10%. Mix & match dark chocolate fudge, molten Lotus Biscoff slabs, and roasted Kashmiri walnut brownies in an embossed gift box with a satin ribbon.
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/shop"
                  className="px-8 py-3.5 rounded-full bg-cream-50 hover:bg-caramel-200 text-chocolate-950 text-sm font-semibold transition-all shadow-soft active:scale-95 inline-flex items-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-caramel-600" />
                  <span>Choose Your Brownies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-caramel-300 font-medium">
                  Use coupon code <strong className="text-white underline">SWEETBOX</strong> for ₹150 off!
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-card-hover border-2 border-chocolate-700 bg-chocolate-800">
                <img
                  src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80"
                  alt="Curated Rasoolicious luxury gift box"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 6. MOLTEN & LOADED BROWNIE SLABS ================= */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          badge="Chef's Selection"
          title="Molten & Loaded Brownie Slabs"
          subtitle="Thick 500g whole uncut slabs featuring molten Nutella cores, golden salted caramel, and crunchy caramelized almonds."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {moltenBrownies.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft"
          >
            <span>Explore All Brownie Slabs</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ================= ABOUT / LOVE STORY SECTION ================= */}
      <section id="about" className="py-16 md:py-24 bg-[#FAF6F0] border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-chocolate-900">
                <img
                  src="https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=800&q=80"
                  alt="Rasoolicious Handcrafted Brownies"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                  <span className="font-serif font-bold text-base block text-caramel-300">Where Love Meets Deliciousness</span>
                  <span>Handcrafted in small daily batches for the ones you cherish.</span>
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 hidden sm:flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xl border border-stone-200">
                <div className="w-9 h-9 rounded-xl bg-caramel-500 text-white flex items-center justify-center font-serif text-base font-bold">
                  R
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-chocolate-950">It started with a brownie</div>
                  <div className="text-stone-500 text-[11px]">It became a love story</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-caramel-100 text-chocolate-800 border border-caramel-300">
                <Heart className="w-3.5 h-3.5 text-caramel-600 fill-caramel-600" />
                <span>About Rasoolicious</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-chocolate-950 leading-tight">
                It started with a brownie. <br />
                <span className="italic text-caramel-700 font-serif">It became a love story.</span>
              </h2>

              <p className="text-chocolate-800 text-base sm:text-lg leading-relaxed font-medium">
                Rasoolicious began with something simple — a batch of brownies made for my wife, <strong>Rasool</strong>. It was the very first thing I ever made for her, and she loved them so much that I kept making them again and again.
              </p>

              <p className="text-chocolate-600 text-sm sm:text-base leading-relaxed">
                What started as a small gesture of love slowly became a passion for creating brownies that bring the exact same feeling of warmth, joy, and comfort to everyone who tastes them.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-stone-200/90 shadow-xs space-y-2 text-xs sm:text-sm">
                <span className="font-bold text-chocolate-950 block font-serif text-base">The Meaning Behind Our Name</span>
                <p className="text-stone-600 leading-relaxed">
                  <strong>“Rasool”</strong> means <em>Messenger</em>, while <strong>“Delicious”</strong> represents <em>Great Taste</em>. Together, Rasoolicious represents our desire to be a <strong>messenger of deliciousness</strong> — sharing happiness, love, and unforgettable taste through every brownie.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/our-story"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-chocolate-900 hover:bg-caramel-600 text-cream-50 text-xs font-semibold uppercase tracking-wider transition-colors shadow-soft"
                >
                  <span>Read Our Full Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <span className="text-xs text-caramel-700 font-medium italic">
                  One brownie. One story. One delicious feeling.
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 7. WHY CHOOSE US ================= */}
      <section id="why-us" className="py-16 md:py-24 bg-cream-100/60 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <SectionHeading
            badge="The Rasoolicious Standard"
            title="Why Our Bakes Taste Different"
            subtitle="We believe real desserts demand real ingredients, honest patience, and zero compromises."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Clock,
                title: 'Freshly Baked',
                description: 'Made in small daily batches so you receive artisanal brownies at their absolute peak flavour and texture.',
              },
              {
                icon: Award,
                title: 'Premium Ingredients',
                description: 'Single-origin 70% Callebaut chocolate, French cultured butter, Madagascar vanilla beans, and sea salt.',
              },
              {
                icon: HeartHandshake,
                title: 'Handmade Craft',
                description: 'Prepared with meticulous attention to detail by Chef Rasool in our Marthandam brownie atelier.',
              },
              {
                icon: Truck,
                title: 'Delivered Fresh',
                description: 'Packed carefully in custom insulated crates to ensure your handcrafted brownie slabs arrive in pristine condition.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-200/80 shadow-soft hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 text-center sm:text-left"
                >
                  <div className="w-12 h-12 rounded-2xl bg-caramel-100 text-caramel-600 flex items-center justify-center mb-5 mx-auto sm:mx-0 shadow-soft-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl text-chocolate-900 font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-chocolate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= 8. TESTIMONIALS ================= */}
      <section id="testimonials" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <SectionHeading
          badge="Praise from Dessert Lovers"
          title="What Our Customers Say"
          subtitle="Honest reviews from regulars who order their weekly cravings from our studio."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-cream-200 shadow-soft hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-chocolate-800 italic leading-relaxed mb-6 font-serif">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-cream-100">
                <div className="font-semibold text-sm text-chocolate-900">
                  {t.name}
                </div>
                <div className="text-xs text-chocolate-500">{t.location}</div>
                <div className="mt-2 text-[11px] font-medium text-caramel-600 bg-caramel-50 px-2 py-0.5 rounded-md inline-block">
                  Loved: {t.treat}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 9. INSTAGRAM GALLERY ================= */}
      <section className="py-16 bg-cream-100/50 border-t border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-caramel-600">
            @rasoolicious
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-chocolate-900 mt-1">
            Follow our daily bake on Instagram
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 px-4 max-w-[1400px] mx-auto">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={BRAND_CONFIG.social.instagram}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-cream-200 shadow-soft-sm block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-chocolate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 text-center text-white">
                <svg className="w-6 h-6 mb-1 fill-current text-caramel-300" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span className="text-[11px] font-medium leading-tight line-clamp-3">
                  {post.caption}
                </span>
                <span className="text-[10px] text-caramel-300 mt-1">♥ {post.likes}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ================= 10. NEWSLETTER SIGNUP ================= */}
      <Newsletter />

      {/* Quick View Modal */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
