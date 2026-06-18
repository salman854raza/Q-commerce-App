'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

const pizzas = [
  { name: 'Mexican Green Wave', price: '$19.00', oldPrice: '$25.00', rating: 5.0, emoji: '🍕' },
  { name: 'Indi Tandoori Paneer', price: '$18.00', oldPrice: '$24.00', rating: 4.9, emoji: '🍕' },
  { name: 'Double Chicken Sausage', price: '$20.00', oldPrice: '$22.00', rating: 5.0, emoji: '🍕' },
  { name: 'Grilled Veal Cooked', price: '$16.00', oldPrice: '$20.00', rating: 4.3, emoji: '🍕' },
];

export default function PopularPizzaSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5] overflow-hidden relative">
      {/* Big watermark text */}
      <div className="absolute bottom-4 left-0 right-0 text-center">
        <span className="text-[120px] font-black text-gray-100 uppercase select-none">SIGNATURE</span>
      </div>

      {/* Floating tomato */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute top-8 right-8 text-5xl hidden md:block"
        style={{ filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.2))' }}
      >
        🍅
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#c8102e] text-sm font-semibold uppercase tracking-widest mb-2"
          >
            OUR SIGNATURE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-black text-gray-900 uppercase"
          >
            POPULAR PIZZA
          </motion.h2>
        </div>

        {/* Pizza Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {pizzas.map((pizza, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="text-center cursor-pointer"
            >
              <motion.div
                whileHover={{ rotate: 15 }}
                transition={{ type: 'spring' }}
                className="text-[80px] mb-3 block"
              >
                {pizza.emoji}
              </motion.div>
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="flex bg-[#d4a017] rounded px-2 py-0.5 gap-0.5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={10} fill="white" className="text-white" />
                  ))}
                  <span className="text-white text-xs font-bold ml-1">{pizza.rating}</span>
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{pizza.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">
                <span className="text-gray-400 line-through text-sm">{pizza.oldPrice}</span>
                <span className="text-[#c8102e] font-bold">{pizza.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore Menu Button */}
        <div className="text-center">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#c8102e', color: 'white' }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="w-28 h-28 rounded-full bg-gray-900 text-white font-black uppercase text-sm leading-tight transition-colors shadow-xl"
          >
            EXPLORE<br />MENU
          </motion.button>
        </div>
      </div>
    </section>
  );
}
