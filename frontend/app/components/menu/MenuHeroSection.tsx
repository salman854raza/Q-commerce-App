'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';

export default function MenuHeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const pizzaScale = useTransform(scrollYProgress, [0, 0.6], [1, 1.15]);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - pizza */}
          <motion.div className="relative" style={{ scale: pizzaScale }}>
            <motion.div className="relative w-full max-w-md mx-auto"
              initial={{ opacity: 0, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.9, type: 'spring' }}>
              <span className="text-[220px] block leading-none text-center filter drop-shadow-2xl animate-float">🍕</span>
              {/* Free home delivery badge */}
              <motion.div className="absolute top-8 left-8 bg-[#c8102e] text-white rounded-full w-24 h-24 flex flex-col items-center justify-center text-center text-xs font-black leading-tight shadow-2xl"
                animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                FREE HOME<br />DELIVERY
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right - text */}
          <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c8102e] font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c8102e]" /> BUY ONE PIZZA. GET ONE FREE.
            </p>
            <h2 className="text-5xl md:text-6xl font-black leading-tight mb-6">
              DOUBLE FUN ON EVERY DELIVERY.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest, tastiest and funnest pizza around.
            </p>
            <Link href="#exclusive-menu">
              <motion.button className="btn-dark" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                EXCLUSIVE MENU
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
