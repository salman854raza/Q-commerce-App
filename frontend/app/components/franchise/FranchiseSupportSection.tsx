'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const slides = [
  { title: 'WE ALWAYS SUPPORT TO BUSINESS GROWTH.', desc: 'Our support center team provide the who dedication insight. Start a business in which the dealer speaks that will give advertising or deals plan.', img1: '👩‍💼', img2: '🍕' },
  { title: 'YOUR SUCCESS IS OUR SUCCESS.', desc: 'We provide full training, marketing support and business intelligence tools to help your franchise thrive from day one.', img1: '🤝', img2: '📈' },
  { title: 'JOIN A WINNING TEAM TODAY.', desc: 'Become part of the fastest growing pizza franchise with over 16 years of experience and hundreds of satisfied franchise owners.', img1: '🏆', img2: '🎯' },
];

export default function FranchiseSupportSection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tomatoY = useTransform(scrollYProgress, [0, 1], [-60, 80]);
  const tomatoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // Two images animate separately - img1 moves UP, img2 moves DOWN on scroll
  const img1Y = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [-30, 50]);
  const inView = useInView(ref, { once: true });
  const slide = slides[current];

  return (
    <section ref={ref} className="py-20 bg-[#f5f5f5] relative overflow-hidden">
      {/* 3D spinning tomato */}
      <motion.div className="absolute left-6 top-16 w-20 h-20 pointer-events-none z-10" style={{ y: tomatoY, rotate: tomatoRotate }}>
        <span className="text-6xl img-3d block" style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.3))' }}>🍅</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - two images animated separately */}
          <motion.div className="relative h-80"
            initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            {/* Image 1 - moves UP */}
            <motion.div className="absolute top-0 left-0 w-44 h-56 bg-white shadow-xl flex items-center justify-center rounded-sm overflow-hidden" style={{ y: img1Y }}>
              <span className="text-[100px] leading-none">{slide.img1}</span>
            </motion.div>
            {/* Image 2 - moves DOWN */}
            <motion.div className="absolute bottom-0 right-8 w-48 h-52 bg-gray-800 shadow-xl flex items-center justify-center rounded-sm overflow-hidden" style={{ y: img2Y }}>
              <span className="text-[100px] leading-none">{slide.img2}</span>
            </motion.div>
          </motion.div>

          {/* Right - text with navigation */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-[#c8102e] font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c8102e]" /> BEST ITALIAN FOOD FOR YOUR FAMILY
            </p>
            <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">{slide.title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">{slide.desc}</p>
            <div className="flex gap-3">
              <button onClick={() => setCurrent(c => (c - 1 + slides.length) % slides.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all">
                <ChevronLeft size={16} />
              </button>
              <button onClick={() => setCurrent(c => (c + 1) % slides.length)}
                className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* FRANCHISE watermark */}
        <div className="mt-8 text-center overflow-hidden">
          <span className="text-[60px] md:text-[100px] font-black text-gray-200 select-none leading-none tracking-tighter">
            FRANCHISE
          </span>
        </div>
      </div>
    </section>
  );
}
