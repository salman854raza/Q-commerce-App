'use client';

import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative bg-[#c8102e] pt-24 pb-16 overflow-hidden">
      {/* Decorative torn edge */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Herb decorations */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl opacity-60"
      >
        🌿
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-white uppercase tracking-widest"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-px h-8 bg-[#d4a017] mx-4 inline-block"
        />
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#d4a017] uppercase tracking-widest text-sm font-semibold"
        >
          {subtitle}
        </motion.span>
      </div>

      {/* Torn bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 h-6 bg-white" style={{
        clipPath: 'polygon(0 100%, 100% 100%, 100% 20%, 95% 60%, 90% 20%, 85% 70%, 80% 20%, 75% 60%, 70% 10%, 65% 60%, 60% 20%, 55% 70%, 50% 20%, 45% 60%, 40% 10%, 35% 60%, 30% 20%, 25% 70%, 20% 20%, 15% 60%, 10% 10%, 5% 60%, 0 20%)'
      }} />
    </section>
  );
}
