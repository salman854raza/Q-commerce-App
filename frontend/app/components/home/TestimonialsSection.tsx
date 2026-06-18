'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Star, Heart } from 'lucide-react';

const testimonials = [
  {
    name: 'Matthew Taylor',
    review: 'Talking about this branch the staff, quality of food, most importantly the speed of service is just great! Highly recommended restaurant. Must try take away services.',
    rating: 5,
    emoji: '😊',
  },
  {
    name: 'Larry Wightman',
    review: 'Talking about this branch the staff, quality of food & most importantly the speed of service is just great! Highly recommended.',
    rating: 5,
    emoji: '👨',
  },
  {
    name: 'Mamma Garcia',
    review: 'Tasty pizza, staff is very attentive, excellent place to have pizza they also have home delivery.',
    rating: 5,
    emoji: '👩',
  },
  {
    name: 'William Smith',
    review: 'Tasty pizza, staff is very attentive, excellent place to have pizza they also have home delivery and away services.',
    rating: 5,
    emoji: '🧑',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5] relative overflow-hidden">
      {/* Big watermark */}
      <div className="absolute bottom-0 left-0 right-0 text-center overflow-hidden">
        <span className="text-[100px] font-black text-gray-200 uppercase select-none leading-none">SATISFIED</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          {/* Left: Title */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
          >
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} fill="#c8102e" className="text-[#c8102e]" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500">FOOD LOVERS</span>
            </div>
            <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight mb-6">
              SATISFIED<br />CUSTOMERS
            </h2>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#c8102e', color: 'white' }}
                whileTap={{ scale: 0.9 }}
                onClick={prev}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: '#c8102e', color: 'white' }}
                whileTap={{ scale: 0.9 }}
                onClick={next}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </motion.div>

          {/* Center: Photo stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-52 h-64">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0, rotate: -5, scale: 0.9 }}
                  animate={{ opacity: 1, rotate: -3, scale: 1 }}
                  exit={{ opacity: 0, rotate: 5, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white rounded-lg shadow-xl flex flex-col items-center justify-center p-4"
                  style={{ transform: 'rotate(-3deg)' }}
                >
                  <div className="text-6xl mb-4">{testimonials[current].emoji}</div>
                  <div className="text-sm font-bold text-gray-700 text-center italic">
                    &ldquo;Excellent&rdquo;
                  </div>
                  <div className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
                    {testimonials[current].name}
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Name tag on side */}
              <div
                className="absolute -right-8 top-1/2 -translate-y-1/2 text-xs font-bold uppercase tracking-widest text-gray-500"
                style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
              >
                {testimonials[current].name}
              </div>
            </div>
          </motion.div>

          {/* Right: Review text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">
                  {testimonials[current].review}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#d4a017" className="text-[#d4a017]" />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
