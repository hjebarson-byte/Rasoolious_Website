import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND_CONFIG } from '../config/brand';

interface RasooliciousLoaderProps {
  /** 'fullscreen' covers the entire viewport; 'inline' sits inside a container/button */
  variant?: 'fullscreen' | 'inline';
  /** Size for inline usage */
  size?: 'sm' | 'md' | 'lg';
  /** Optional custom loading message */
  message?: string;
  /** If true, cycles through playful bakery messages */
  cycleMessages?: boolean;
}

const BAKING_STEPS = [
  "Preheating the ovens to 180°C...",
  "Melting 70% dark Belgian chocolate...",
  "Whisking velvety brown butter...",
  "Sprinkling Maldon sea salt flakes...",
  "Plating your freshly baked treats...",
];

export const RasooliciousLoader: React.FC<RasooliciousLoaderProps> = ({
  variant = 'fullscreen',
  size = 'md',
  message,
  cycleMessages = true,
}) => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!cycleMessages || message) return;
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % BAKING_STEPS.length);
    }, 1800);
    return () => clearInterval(interval);
  }, [cycleMessages, message]);

  // Inline Micro-Loader (for buttons or small cards)
  if (variant === 'inline') {
    const sizeClasses = {
      sm: 'w-6 h-6',
      md: 'w-10 h-10',
      lg: 'w-14 h-14',
    };

    return (
      <div className="inline-flex items-center gap-2.5 justify-center">
        <div className={`relative ${sizeClasses[size]}`}>
          {/* Subtle warm glow */}
          <div className="absolute inset-0 rounded-full bg-caramel-400/40 blur-sm animate-pulse" />
          
          {/* Rotating/pulsing logo emblem */}
          <motion.img
            src={BRAND_CONFIG.logo}
            alt="Loading..."
            className="w-full h-full object-cover rounded-full border border-caramel-400 relative z-10 shadow-sm"
            animate={{
              scale: [1, 1.08, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.2,
              ease: "easeInOut",
            }}
          />
        </div>
        {message && (
          <span className="text-xs font-medium text-chocolate-800 tracking-wide">
            {message}
          </span>
        )}
      </div>
    );
  }

  // Full-Screen Luxury Brand Splash Loader
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-cream-50/95 backdrop-blur-md px-6 select-none">
      {/* Ambient background radial warm glow */}
      <div className="absolute w-96 h-96 rounded-full bg-caramel-300/25 blur-3xl pointer-events-none -top-10" />
      <div className="absolute w-80 h-80 rounded-full bg-chocolate-400/10 blur-3xl pointer-events-none -bottom-10" />

      <div className="relative flex flex-col items-center text-center max-w-sm z-10">
        {/* Animated Rising Steam Particles above the Brownie */}
        <div className="relative w-24 h-12 mb-1 flex items-end justify-center pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute text-caramel-500/70 font-serif text-lg"
              initial={{ opacity: 0, y: 10, scale: 0.6 }}
              animate={{
                opacity: [0, 0.9, 0],
                y: [-5, -35],
                x: [0, (i - 1) * 12],
                scale: [0.6, 1.2, 1.5],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.4,
                delay: i * 0.7,
                ease: "easeOut",
              }}
            >
              ♨
            </motion.span>
          ))}
          {/* Gentle floating heart steam like in the logo */}
          <motion.span
            className="text-terracotta-500/80 text-sm absolute -top-2"
            animate={{
              y: [-2, -22],
              opacity: [0, 1, 0],
              scale: [0.7, 1.2],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.6,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            🤎
          </motion.span>
        </div>

        {/* Central Logo Container with Breathing Radial Aura */}
        <div className="relative mb-6">
          {/* Pulsing caramel backlight ring */}
          <motion.div
            className="absolute -inset-3 rounded-full bg-gradient-to-tr from-caramel-400 to-terracotta-500 opacity-40 blur-md"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          />

          {/* Logo Frame */}
          <motion.div
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl p-3 bg-white shadow-card-hover border-2 border-caramel-300 overflow-hidden flex items-center justify-center"
            animate={{
              scale: [1, 1.03, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 2.5,
              ease: "easeInOut",
            }}
          >
            <img
              src={BRAND_CONFIG.logo}
              alt="Rasoolicious Logo"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </motion.div>
        </div>

        {/* Brand Name Typography */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-1 mb-5"
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-black tracking-wider text-chocolate-950 uppercase">
            {BRAND_CONFIG.shortName}
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-widest text-caramel-600 font-semibold font-sans">
            {BRAND_CONFIG.tagline}
          </p>
        </motion.div>

        {/* Molten Chocolate Progress Bar */}
        <div className="w-56 sm:w-64 h-1.5 bg-cream-200 rounded-full overflow-hidden relative shadow-inner mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-caramel-500 via-chocolate-700 to-caramel-400 rounded-full"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: "easeInOut",
            }}
            style={{ width: '60%' }}
          />
        </div>

        {/* Playful Bakery Status Step */}
        <div className="h-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={message || stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
              className="text-xs text-chocolate-600 font-medium tracking-wide italic"
            >
              {message || BAKING_STEPS[stepIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
