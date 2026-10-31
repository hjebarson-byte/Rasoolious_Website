import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Check, 
  Star, 
  ArrowRight, 
  Sparkles, 
  Flame, 
  Award, 
  ChevronDown 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../admin/context/AdminContext';
import type { Product } from '../types';

const TOTAL_FRAMES = 120;

export const ScrollVideoStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { products } = useAdmin();
  const matchedProduct = (products as Product[]).find((p) => p.id === 'br-rasool') || (products as Product[])[0];

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);

  // Draw image on canvas with cover scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const ratio = Math.max(cw / iw, ch / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const ox = (cw - nw) / 2;
    const oy = (ch - nh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, ox, oy, nw, nh);
  }, []);

  // Preload all 120 frames in the background
  useEffect(() => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(4, '0');
      img.src = `/videos/frames/frame_${paddedIndex}.webp`;

      img.onload = () => {
        loadedCount++;
        // Render first frame as soon as it arrives
        if (i === 1) {
          drawFrame(0);
        }
        if (loadedCount >= 15 && !isLoaded) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    // Canvas size setup
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      drawFrame(Math.round(currentFrameRef.current));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [drawFrame, isLoaded]);

  // Smooth 60fps render loop
  useEffect(() => {
    let lastDrawnFrame = -1;

    const renderLoop = () => {
      // Fast, responsive interpolation
      const diff = targetFrameRef.current - currentFrameRef.current;
      currentFrameRef.current += diff * 0.28;

      const frameToDraw = Math.min(
        TOTAL_FRAMES - 1, 
        Math.max(0, Math.round(currentFrameRef.current))
      );

      if (frameToDraw !== lastDrawnFrame) {
        drawFrame(frameToDraw);
        lastDrawnFrame = frameToDraw;
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [drawFrame]);

  // Scroll position to frame mapping
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;

      if (scrollableDist <= 0) return;

      const rawProgress = -rect.top / scrollableDist;
      const clamped = Math.max(0, Math.min(1, rawProgress));

      targetFrameRef.current = clamped * (TOTAL_FRAMES - 1);
      setProgress(clamped);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleQuickAdd = () => {
    if (!matchedProduct) return;
    addToCart(matchedProduct, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Chapter boundaries:
  // Chapter 1: 0.00 -> 0.25 (The Belgian Core)
  // Chapter 2: 0.28 -> 0.55 (Raw Ingredients)
  // Chapter 3: 0.58 -> 0.80 (The 175°C Oven)
  // Chapter 4: 0.83 -> 1.00 (Fresh Warmth / CTA)
  const isCh1 = progress >= 0 && progress < 0.26;
  const isCh2 = progress >= 0.28 && progress < 0.56;
  const isCh3 = progress >= 0.58 && progress < 0.81;
  const isCh4 = progress >= 0.83;

  return (
    <section 
      ref={containerRef} 
      className="relative h-[340vh] bg-chocolate-950 text-cream-50"
      aria-label="Interactive Brownie Craft Story"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Hardware-accelerated High-performance Canvas (Zero video stutter) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Cinematic Vignette & Readability Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/90 via-chocolate-950/20 to-chocolate-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate-950/80 via-transparent to-chocolate-950/80 pointer-events-none" />

        {/* Top Story Chapter Indicator Bar */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 px-4 sm:px-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-between gap-2 p-1.5 rounded-full bg-chocolate-950/70 backdrop-blur-md border border-white/10 shadow-2xl">
            {[
              { id: 1, label: '01. The Molten Core', active: isCh1 },
              { id: 2, label: '02. Pure Ingredients', active: isCh2 },
              { id: 3, label: '03. The 175°C Oven', active: isCh3 },
              { id: 4, label: '04. Fresh On Marble', active: isCh4 },
            ].map((ch) => (
              <div
                key={ch.id}
                className={`flex-1 text-center py-1.5 px-2 rounded-full transition-all duration-300 ${
                  ch.active
                    ? 'bg-caramel-500 text-chocolate-950 font-bold shadow-soft-sm'
                    : 'text-cream-200/60 font-medium text-[11px] sm:text-xs'
                }`}
              >
                <span className="hidden sm:inline">{ch.label}</span>
                <span className="sm:hidden">{ch.id}</span>
              </div>
            ))}
          </div>

          {/* Micro Progress Bar */}
          <div className="w-full bg-white/10 h-1 rounded-full mt-2 overflow-hidden">
            <div 
              className="bg-caramel-400 h-full rounded-full transition-all duration-75"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>

        {/* Chapter 1: The Molten Core */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-20 bottom-16 sm:bottom-24 max-w-lg z-20 transition-all duration-500 ease-out ${
            isCh1 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-chocolate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-caramel-500/20 border border-caramel-400/30 text-caramel-300 text-[10px] font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>Chapter 01 • Single-Origin Belgian</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-cream-50">
              The Art of <br />
              <span className="italic text-caramel-300 font-serif">Molten Fudge.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Paper-thin crinkle crust with a dense, flowing Belgian 70% Callebaut core. Salted with hand-harvested Maldon flakes for pure chocolate intensity.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-caramel-200/80 font-medium">
              <span>70% Dark Cocoa</span>
              <span>•</span>
              <span>French Butter</span>
              <span>•</span>
              <span>Maldon Sea Salt</span>
            </div>
          </div>
        </div>

        {/* Chapter 2: Pure Ingredients */}
        <div
          className={`absolute right-4 sm:right-12 lg:right-20 top-36 sm:top-40 max-w-lg z-20 transition-all duration-500 ease-out ${
            isCh2 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 -translate-y-8 pointer-events-none'
          }`}
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-chocolate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4 text-right sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-extrabold uppercase tracking-widest">
              <Award className="w-3 h-3" />
              <span>Chapter 02 • Clean Pantry</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-cream-50">
              Honest Ingredients. <br />
              <span className="italic text-caramel-300 font-serif">Zero Shortcuts.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Every batch begins with raw ingredients: cultured grass-fed creamery butter, free-range eggs, organic raw cane sugar, and whole Bourbon vanilla bean caviar.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              {['No Preservatives', 'No Palm Oil', 'Single-Origin Cacao', 'Small Batches'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-cream-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Chapter 3: The 175°C Oven */}
        <div
          className={`absolute left-4 sm:left-12 lg:left-20 top-36 sm:top-40 max-w-lg z-20 transition-all duration-500 ease-out ${
            isCh3 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="p-6 sm:p-8 rounded-3xl bg-chocolate-950/80 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-widest">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span>Chapter 03 • Morning Oven Craft</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-cream-50">
              Slow-Baked at 175°C. <br />
              <span className="italic text-caramel-300 font-serif">Timed to the Second.</span>
            </h2>

            <p className="text-sm sm:text-base text-cream-200/80 leading-relaxed">
              Our deck ovens hum every morning at 7:00 AM. We pull trays precisely when the outer crust sets while the center stays lush, dense, and molten.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-amber-200/90 font-bold uppercase tracking-wider">
              <span>🔥 Fresh Morning Batch #042</span>
              <span>•</span>
              <span>Baked Daily in Kanniyakumari</span>
            </div>
          </div>
        </div>

        {/* Chapter 4: Fresh On Marble + Interactive Quick Add Card */}
        <div
          className={`absolute right-4 sm:right-10 lg:right-16 bottom-12 sm:bottom-16 max-w-md w-full z-20 transition-all duration-500 ease-out ${
            isCh4 
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' 
              : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="p-6 sm:p-7 rounded-3xl bg-chocolate-950/85 backdrop-blur-2xl border border-white/20 text-cream-50 shadow-2xl space-y-4">
            
            <div className="flex items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-caramel-500/25 border border-caramel-400/40 text-caramel-300 text-[10px] font-extrabold tracking-widest uppercase">
                Oven Star • Signature
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cream-200">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{matchedProduct.rating}</span>
                <span className="text-cream-400 text-[11px]">({matchedProduct.reviews} reviews)</span>
              </div>
            </div>

            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold leading-snug text-cream-50">
                {matchedProduct.name}
              </h3>
              <p className="text-xs text-cream-200/80 mt-1 line-clamp-2">
                {matchedProduct.shortDescription}
              </p>
            </div>

            <div className="flex items-baseline justify-between pt-1 border-t border-white/10">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-2xl text-caramel-300">₹{matchedProduct.price}</span>
                {matchedProduct.originalPrice && (
                  <span className="text-xs text-cream-400 line-through">₹{matchedProduct.originalPrice}</span>
                )}
              </div>
              <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Fresh Morning Batch
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <Link
                to={`/product/${matchedProduct.id}`}
                className="py-3 px-3 rounded-full border border-white/20 text-cream-100 text-xs font-semibold text-center hover:bg-white/10 transition-colors flex items-center justify-center gap-1"
              >
                <span>Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                type="button"
                onClick={handleQuickAdd}
                disabled={isAdded}
                className={`py-3 px-4 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 shadow-soft transition-all duration-200 active:scale-95 ${
                  isAdded
                    ? 'bg-emerald-600 text-white'
                    : 'bg-caramel-500 hover:bg-caramel-400 text-chocolate-950 font-bold'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Initial Scroll Prompt (Fades out once user scrolls past 5%) */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 text-cream-200/80 transition-opacity duration-300 pointer-events-none ${
            progress < 0.08 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase">
            Scroll to explore the bake
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-caramel-400" />
        </div>

      </div>
    </section>
  );
};
