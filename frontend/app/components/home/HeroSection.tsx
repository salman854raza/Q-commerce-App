'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.08]);

  return (
    <section ref={ref} className="relative min-h-screen bg-[#c8102e] overflow-hidden flex flex-col">
      {/* Decorative vegetables */}
      <motion.div className="absolute top-16 right-8 w-20 h-20 z-20 pointer-events-none" style={{ y: y2 }}>
        <div className="w-full h-full animate-spin-slow opacity-90">
          <svg viewBox="0 0 80 80" className="w-full h-full"><circle cx="40" cy="40" r="35" fill="#c8102e" stroke="#a00d24" strokeWidth="2"/><text x="40" y="48" textAnchor="middle" fontSize="28">🫑</text></svg>
        </div>
      </motion.div>
      <motion.div className="absolute top-24 left-6 w-16 h-16 z-20 pointer-events-none" style={{ y: y1 }}>
        <div className="animate-float"><span className="text-5xl">🍅</span></div>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-16 px-4">
        <motion.div className="text-center mb-6"
          initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="text-[#d4a017] font-bold italic text-2xl md:text-3xl" style={{ fontFamily: 'Georgia, serif' }}>
            Original
          </p>
        </motion.div>

        <motion.h1 className="text-white font-black text-center leading-none mb-8"
          style={{ fontSize: 'clamp(4rem, 15vw, 10rem)', letterSpacing: '-0.02em', textShadow: '4px 4px 0px rgba(0,0,0,0.2)' }}
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }}>
          ITALIAN
        </motion.h1>

        {/* Pizza image */}
        <motion.div className="relative w-full max-w-2xl mx-auto" style={{ scale }}>
          <motion.div className="relative" initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}>
            <div className="w-full aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[200px] md:text-[280px] filter drop-shadow-2xl animate-float" style={{ lineHeight: 1 }}>🍕</span>
              </div>
              {/* Today offer badge */}
              <motion.div className="absolute top-8 right-4 md:right-8 bg-[#d4a017] text-white rounded-full w-20 h-20 flex flex-col items-center justify-center text-center font-black uppercase text-xs leading-tight shadow-xl"
                animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity }}>
                TODAY<br/>OFFER
              </motion.div>
            </div>
          </motion.div>

          {/* Order button */}
          <motion.div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20"
            initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}>
            <Link href="/menu">
              <motion.div className="w-28 h-28 bg-[#d4a017] rounded-full flex flex-col items-center justify-center text-white font-black text-sm uppercase shadow-2xl cursor-pointer border-4 border-white"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} animate={{ boxShadow: ['0 0 0 0 rgba(212,160,23,0.4)', '0 0 0 20px rgba(212,160,23,0)', '0 0 0 0 rgba(212,160,23,0.4)'] }} transition={{ duration: 2, repeat: Infinity }}>
                <ArrowRight size={18} className="mb-1" />
                ORDER<br/>PIZZA
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom white section */}
      <div className="relative bg-white mt-16 pt-20 pb-8">
        <div className="hero-brush absolute -top-1 left-0 right-0" style={{ background: 'white' }} />
        
        <motion.p className="text-center text-gray-300 font-black text-3xl md:text-4xl tracking-widest uppercase mb-12"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          THE TRUE TASTE OF ITALY
        </motion.p>

        {/* Category tabs */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: 'PIZZA', icon: '🍕' },
              { label: 'BURGERS', icon: '🍔' },
              { label: 'SALAD', icon: '🥗' },
              { label: 'FRIES', icon: '🍟' },
            ].map((cat, i) => (
              <motion.div key={cat.label} className="flex flex-col items-center gap-2 p-4 cursor-pointer hover:text-[#c8102e] transition-colors border-b-2 border-transparent hover:border-[#c8102e]"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.1 }}
                whileHover={{ y: -3 }}>
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-xs font-bold text-gray-500 tracking-widest">{cat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
