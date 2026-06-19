'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  { name: 'Larry Wightman', rating: 5.0, text: 'Talking about this branch the staff, quality of food & most importantly the speed of service is just great! Highly recommended.', avatar: '👨' },
  { name: 'Mamma Garcia', rating: 5.0, text: 'Excellent, deliciuk and tasty pizza. staff is highly attentive, excellent place to have pizza they also have home delivery.', avatar: '👩' },
  { name: 'William Smith', rating: 5.0, text: 'Tasty pizza, staff is very attentive, an excellent place to have pizza. they also have home delivery and away services.', avatar: '👨‍🦱' },
  { name: 'Matthew Taylor', rating: 5.0, text: 'Talking about this branch the staff, quality of food, most importantly the speed of service is just great! Must try take away services.', avatar: '🧔' },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left heading */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
              SATISFIED<br />CUSTOMERS
            </h2>
            <div className="flex items-center gap-2 text-[#c8102e]">
              <span className="text-lg">❤️</span>
              <span className="text-xs font-bold uppercase tracking-widest">FOOD LOVERS</span>
            </div>
            <div className="flex gap-3 mt-8">
              <button onClick={() => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrent(c => (c + 1) % testimonials.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Center - photo stack */}
          <motion.div className="flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.2, duration: 0.7 }}>
            <div className="relative w-48 h-56">
              {testimonials.map((t, i) => (
                <motion.div key={t.name}
                  className="absolute inset-0 bg-white shadow-xl flex flex-col items-center justify-center rounded-sm"
                  style={{ rotate: (i - current) * 8, zIndex: i === current ? 10 : 5 - Math.abs(i - current) }}
                  animate={{ rotate: (i - current) * 8, scale: i === current ? 1 : 0.93 }}
                  transition={{ duration: 0.4 }}>
                  <span className="text-6xl mb-3">{t.avatar}</span>
                  <p className="text-xs font-bold text-gray-700">{t.name.split(' ')[0]}</p>
                  <div className="mt-2 bg-[#d4a017] text-white text-xs px-2 py-0.5 font-bold rounded">Excellent</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - testimonial text */}
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}>
              <div className="mb-3">
                <p className="font-black text-sm tracking-wider uppercase">{testimonials[current].name}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-[#d4a017] text-[#d4a017]" />
                  ))}
                  <span className="text-xs font-bold text-[#d4a017] ml-1">{testimonials[current].rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed italic">"{testimonials[current].text}"</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* SATISFIED watermark */}
        <div className="mt-12 text-center overflow-hidden">
          <span className="text-[80px] md:text-[120px] font-black text-gray-100 select-none leading-none tracking-tighter">
            SATISFIED
          </span>
        </div>
      </div>
    </section>
  );
}
