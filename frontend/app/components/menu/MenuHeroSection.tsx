'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function MenuHeroSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Pizza visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            className="relative flex justify-center"
          >
            {/* Free Home Delivery badge */}
            <div className="absolute top-4 left-4 z-20 w-20 h-20 rounded-full bg-[#c8102e] flex items-center justify-center text-center">
              <span className="text-white text-xs font-black uppercase leading-tight">FREE HOME<br />DELIVERY</span>
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[200px] leading-none"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}
            >
              🍕
            </motion.div>
            {/* Decorative items */}
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute bottom-8 left-8 text-3xl"
            >
              🍅
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute top-8 right-8 text-2xl"
            >
              🌿
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2"
            >
              <span className="w-6 h-0.5 bg-[#c8102e]" />
              BUY ONE PIZZA. GET ONE FREE.
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl font-black text-gray-900 uppercase leading-none mb-6"
            >
              DOUBLE FUN ON EVERY DELIVERY.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-500 text-sm leading-relaxed mb-8"
            >
              All about quality you can trust. As one of the original founding pizza brands and the 3rd largest pizza chain, our sole mission is making the freshest, tastiest and funnest pizza around.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, backgroundColor: '#a00d24' }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-900 text-white px-8 py-3 text-xs font-black uppercase tracking-widest"
            >
              EXCLUSIVE MENU
            </motion.button>
          </div>
        </div>
      </div>

      {/* Side call text */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex">
        <div
          className="bg-[#c8102e] text-white text-xs font-bold px-2 py-4 uppercase tracking-widest"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          ORDER BY CALL - 1 800 222 000
        </div>
      </div>
    </section>
  );
}
