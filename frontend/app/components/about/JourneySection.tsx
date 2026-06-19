'use client';
import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const milestones = [
  { year: '1998', title: 'The Beginning', desc: 'Founded in the heart of New York', emoji: '🏙️' },
  { year: '2005', title: 'First Expansion', desc: 'Opened 10 locations across the US', emoji: '🌆' },
  { year: '2014', title: 'Premium Dining', desc: 'Launched our premium dine-in experience', emoji: '🍽️' },
  { year: '2024', title: 'Digital Future', desc: 'AI-powered ordering and delivery', emoji: '🚀' },
];

export default function JourneySection() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const pepperY = useTransform(scrollYProgress, [0, 1], [-50, 100]);
  const pepperRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const inView = useInView(ref, { once: true });

  const prev = () => setCurrent(c => (c - 1 + milestones.length) % milestones.length);
  const next = () => setCurrent(c => (c + 1) % milestones.length);

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      {/* 3D spinning pepper - moves down on scroll */}
      <motion.div className="absolute left-4 md:left-8 top-16 w-24 h-24 pointer-events-none z-10"
        style={{ y: pepperY, rotate: pepperRotate }}>
        <span className="text-7xl img-3d block" style={{ filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))' }}>🫑</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <p className="text-[#c8102e] font-bold text-sm uppercase tracking-widest mb-3">OUR LAST 16 YEARS JOURNEY</p>
          <h2 className="text-2xl md:text-3xl font-black max-w-3xl mx-auto leading-tight">
            WE ARE APARTE A YOUNG AND BEAUTIFUL TEAM WITH A PASSION
            FOR TASTY AND TRADITIONAL FOOD REDISCOVERING AND RELIEVING
            TRADITIONAL ROMANIAN DELICACIES.
          </h2>
        </motion.div>

        {/* Timeline with < > navigation */}
        <div className="relative">
          {/* Red line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#c8102e] opacity-30 -translate-y-1/2 hidden md:block" />

          {/* Images with navigation */}
          <div className="relative flex items-center gap-4">
            <button onClick={prev}
              className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all z-10"
              aria-label="Previous">
              <ChevronLeft size={18} />
            </button>

            <div className="flex-1 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div key={current} className="grid grid-cols-1 md:grid-cols-3 gap-4"
                  initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -60 }}
                  transition={{ duration: 0.4 }}>
                  {[-1, 0, 1].map((offset) => {
                    const idx = (current + offset + milestones.length) % milestones.length;
                    const m = milestones[idx];
                    const isActive = offset === 0;
                    return (
                      <motion.div key={idx} className={`relative rounded-sm overflow-hidden ${isActive ? 'ring-2 ring-[#c8102e]' : 'opacity-80'}`}
                        whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                        <div className={`aspect-video flex items-center justify-center text-8xl ${isActive ? 'bg-gray-900' : 'bg-gray-200'} relative`}
                          style={isActive ? { filter: 'none' } : { filter: 'grayscale(1)' }}>
                          <span>{m.emoji}</span>
                          <div className="absolute bottom-3 left-4">
                            <span className="text-white font-black text-2xl drop-shadow-lg">{m.year}</span>
                          </div>
                        </div>
                        {isActive && (
                          <div className="bg-white p-3">
                            <h3 className="font-bold text-sm">{m.title}</h3>
                            <p className="text-gray-500 text-xs">{m.desc}</p>
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={next}
              className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-[#c8102e] hover:text-[#c8102e] transition-all z-10"
              aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {milestones.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#c8102e] w-6' : 'bg-gray-300'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
