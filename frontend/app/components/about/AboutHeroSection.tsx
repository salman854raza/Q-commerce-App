'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Link from 'next/link';
import { Phone } from 'lucide-react';

export default function AboutHeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // Person image moves DOWN, pizza image moves UP on scroll
  const personY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const pizzaY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const leafY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left text */}
          <motion.div initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <p className="text-[#c8102e] font-bold text-xs uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#c8102e]" /> BEST ITALIAN FOOD FOR YOUR FAMILY
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-6">
              AMAZING AND HYGIENE PASTA AND PIZZA PARLOR.
            </h1>
            <p className="text-gray-500 leading-relaxed mb-8 max-w-md">
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest, tastiest.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <Link href="/chefs">
                <motion.button className="btn-dark" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  PROFESSIONAL CHEF
                </motion.button>
              </Link>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone size={16} className="text-[#c8102e]" />
                <span className="font-semibold">1 800 222 000</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['👩', '👨', '👩'].map((e, i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-lg">{e}</div>
                ))}
              </div>
              <p className="text-sm font-medium text-gray-600">5 star reviews from our satisfied customers.</p>
            </div>
          </motion.div>

          {/* Right - parallax images */}
          <div className="relative h-[500px]">
            {/* Pizza image - moves UP */}
            <motion.div className="absolute top-0 right-0 w-48 h-48 md:w-56 md:h-56" style={{ y: pizzaY }}>
              <motion.div className="w-full h-full bg-gray-100 rounded-sm overflow-hidden flex items-center justify-center shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.4, duration: 0.7 }}>
                <span className="text-8xl">🍕</span>
              </motion.div>
            </motion.div>

            {/* Chef/Person image - moves DOWN */}
            <motion.div className="absolute bottom-8 left-8 w-52 h-64 md:w-64 md:h-80" style={{ y: personY }}>
              <motion.div className="w-full h-full bg-gray-200 rounded-sm overflow-hidden flex items-center justify-center shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
                <span className="text-8xl">👨‍🍳</span>
              </motion.div>
            </motion.div>

            {/* Floating leaf */}
            <motion.div className="absolute top-1/3 left-0 pointer-events-none" style={{ y: leafY }}>
              <span className="text-5xl animate-float block" style={{ animationDelay: '1s' }}>🌿</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
