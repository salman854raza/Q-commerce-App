'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#c8102e] overflow-hidden flex items-center justify-center">
      {/* Background parallax image layer */}
      <motion.div style={{ y }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#8b0d1f] via-[#c8102e] to-[#c8102e] opacity-90" />
      </motion.div>

      {/* Floating food decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        className="absolute top-20 right-10 text-6xl opacity-70 hidden md:block"
        style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }}
      >
        🫑
      </motion.div>
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-32 left-12 text-5xl opacity-60 hidden md:block"
      >
        🍅
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-32 right-20 text-4xl opacity-50 hidden md:block"
      >
        🌶️
      </motion.div>

      {/* TODAY OFFER badge */}
      <motion.div
        initial={{ scale: 0, rotate: -10 }}
        animate={{ scale: 1, rotate: -10 }}
        transition={{ delay: 1, type: 'spring' }}
        className="absolute top-32 right-8 md:right-24 bg-[#d4a017] text-white rounded-full w-20 h-20 flex items-center justify-center text-center text-xs font-black uppercase leading-tight z-20"
      >
        TODAY<br />OFFER
      </motion.div>

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 text-center px-4 pt-16">
        {/* Script heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-[#d4a017] text-2xl mb-2"
          style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
        >
          Original
        </motion.p>

        {/* Main hero title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
          className="text-[120px] md:text-[180px] font-black text-white leading-none uppercase"
          style={{ fontFamily: 'Impact, sans-serif', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
        >
          ITALIAN
        </motion.h1>

        {/* Pizza image placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1, type: 'spring' }}
          className="relative mx-auto -mt-8 mb-4"
          style={{ width: '400px', maxWidth: '90vw' }}
        >
          <div className="w-full aspect-square rounded-t-full bg-gradient-to-b from-amber-800 to-amber-900 flex items-center justify-center overflow-hidden relative"
            style={{ clipPath: 'ellipse(50% 60% at 50% 60%)' }}>
            <span className="text-[120px]">🍕</span>
          </div>
        </motion.div>

        {/* Order Pizza Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="relative inline-block -mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-28 h-28 rounded-full border-4 border-[#d4a017] bg-white flex flex-col items-center justify-center gap-1 shadow-2xl"
          >
            <div className="w-8 h-8 rounded-full bg-[#c8102e] flex items-center justify-center">
              <ArrowRight size={16} className="text-white" />
            </div>
            <span className="text-sm font-black uppercase leading-tight text-center">ORDER<br />PIZZA</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Food categories bar */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-0 left-0 right-0 bg-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-4">
          {[
            { icon: '🍕', label: 'PIZZA' },
            { icon: '🍔', label: 'BURGERS' },
            { icon: '🥗', label: 'SALAD' },
            { icon: '🍟', label: 'FRIES' },
          ].map((cat, i) => (
            <motion.button
              key={i}
              whileHover={{ backgroundColor: '#fff5f5', scale: 1.02 }}
              className={`py-5 flex flex-col items-center gap-2 text-xs font-bold tracking-widest uppercase transition-colors ${
                i === 0 ? 'border-b-2 border-[#c8102e] text-[#c8102e]' : 'text-gray-400 hover:text-[#c8102e]'
              }`}
            >
              <span className="text-2xl">{cat.icon}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
