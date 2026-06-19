'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';

const pizzas = [
  { name: 'Mexican Green Wave', oldPrice: 25, price: 19, rating: 5.0, emoji: '🍕' },
  { name: 'Indi Tandoori Paneer', oldPrice: 24, price: 18, rating: 4.9, emoji: '🍕' },
  { name: 'Double Chicken Sausage', oldPrice: 22, price: 20, rating: 5.0, emoji: '🍕' },
  { name: 'Grilled Veal Cooked', oldPrice: 20, price: 16, rating: 4.3, emoji: '🍕' },
];

export default function PopularPizzaSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">OUR SIGNATURE</span>
          <div className="w-px h-8 bg-gray-200" />
          <h2 className="text-4xl md:text-5xl font-black">POPULAR PIZZA</h2>
        </motion.div>

        {/* Pizza grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {pizzas.map((pizza, i) => (
            <motion.div key={pizza.name}
              className="group text-center hover-lift cursor-pointer"
              initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}>
              {/* Pizza image */}
              <div className="relative w-32 h-32 mx-auto mb-4">
                <motion.span
                  className="text-8xl block leading-none filter drop-shadow-xl"
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}>
                  {pizza.emoji}
                </motion.span>
                <motion.button
                  className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#c8102e] text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <ShoppingCart size={12} />
                </motion.button>
              </div>
              {/* Rating */}
              <div className="flex items-center justify-center gap-1 mb-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={10} className={j < Math.floor(pizza.rating) ? 'fill-[#d4a017] text-[#d4a017]' : 'fill-gray-200 text-gray-200'} />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#d4a017]">{pizza.rating}</span>
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wide mb-1">{pizza.name}</h3>
              <div className="flex items-center justify-center gap-2">
                <span className="text-gray-400 text-xs line-through">${pizza.oldPrice}.00</span>
                <span className="text-[#c8102e] font-black text-sm">${pizza.price}.00</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Explore button */}
        <div className="text-center mt-12">
          <motion.a href="/menu"
            className="inline-flex items-center justify-center w-32 h-32 bg-[#1a1a1a] text-white rounded-full font-black text-sm uppercase tracking-wider hover-lift"
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
            EXPLORE<br />MENU
          </motion.a>
        </div>
      </div>
    </section>
  );
}
