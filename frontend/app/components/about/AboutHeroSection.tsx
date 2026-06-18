'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { Phone } from 'lucide-react';

export default function AboutHeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  // Chef image moves DOWN on scroll (parallax down)
  const chefY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  // Pizza image moves UP on scroll (parallax up)
  const pizzaY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  const [contentRef, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text content */}
          <div ref={contentRef}>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-0.5 bg-[#c8102e] inline-block" />
              BEST ITALIAN FOOD FOR YOUR FAMILY
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-5xl font-black text-gray-900 uppercase leading-tight mb-6"
            >
              AMAZING AND HYGIENE PASTA AND PIZZA PARLOR.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-500 leading-relaxed mb-8 text-sm"
            >
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest, tastiest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: '#a00d24' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#c8102e] text-white px-6 py-3 text-xs font-black uppercase tracking-widest"
              >
                PROFESSIONAL CHEF
              </motion.button>
              <a href="tel:18002220000" className="flex items-center gap-2 text-gray-700 hover:text-[#c8102e] transition-colors">
                <Phone size={16} className="text-[#c8102e]" />
                <span className="font-semibold text-sm">1 800 222 000</span>
              </a>
            </motion.div>

            {/* 5 star reviews */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-3"
            >
              <div className="flex -space-x-2">
                {['😊', '👨', '👩', '🧑'].map((emoji, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-lg">
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600 font-medium">
                5 star reviews from our<br />
                <strong className="text-gray-900">satisfied customers.</strong>
              </p>
            </motion.div>
          </div>

          {/* Right: Parallax image stack */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Chef image - moves DOWN on scroll */}
            <motion.div
              style={{ y: chefY }}
              className="absolute left-0 top-0 w-56 h-72 z-20"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 flex items-end justify-center overflow-hidden shadow-2xl">
                <span className="text-[120px] leading-none">👨‍🍳</span>
              </div>
            </motion.div>

            {/* Pizza image - moves UP on scroll */}
            <motion.div
              style={{ y: pizzaY }}
              className="absolute right-0 top-16 w-64 h-56 z-10"
            >
              <div className="w-full h-full rounded-2xl bg-gradient-to-b from-orange-100 to-orange-200 flex items-center justify-center overflow-hidden shadow-2xl">
                <span className="text-[100px]">🍕</span>
              </div>
            </motion.div>

            {/* Small decorative dot */}
            <motion.div
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-20 left-1/2 w-3 h-3 rounded-full bg-[#c8102e]"
            />
          </div>
        </div>
      </div>

      {/* Delivery banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6 }}
        className="mt-16 bg-gray-50 border-y border-gray-100 py-4"
      >
        <p className="text-center text-sm font-semibold text-gray-700 flex items-center justify-center gap-2">
          <span>🛵</span>
          GET FREE DELIVERY YOUR FOOD OF HAPPINESS IN{' '}
          <span className="text-[#c8102e] font-black underline">WITHIN 30 MINUTES.</span>
        </p>
      </motion.div>
    </section>
  );
}
