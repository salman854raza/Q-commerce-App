'use client';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-[#c8102e] pt-32 pb-16 overflow-hidden">
      {/* Decorative elements */}
      <motion.div className="absolute top-8 left-6 pointer-events-none" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <span className="text-4xl animate-float block">🌿</span>
      </motion.div>
      <motion.div className="absolute top-6 right-8 pointer-events-none" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
        <span className="text-3xl animate-spin-slow block">🌿</span>
      </motion.div>

      <div className="relative z-10 text-center">
        <motion.div className="flex items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <h1 className="text-white font-black text-5xl md:text-6xl uppercase tracking-tight">{title}</h1>
          <div className="h-10 w-px bg-white/40" />
          <span className="text-[#d4a017] font-bold text-sm uppercase tracking-widest">{subtitle}</span>
        </motion.div>
      </div>

      {/* Brush stroke bottom */}
      <div className="hero-brush" />
    </section>
  );
}
