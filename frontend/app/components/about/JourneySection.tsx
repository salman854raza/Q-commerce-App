'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const timelineItems = [
  { year: '1998', label: 'Our Beginning', emoji: '🏙️', desc: 'Founded in New York, started with a single pizzeria.' },
  { year: '2005', label: 'Expansion', emoji: '🍽️', desc: 'Opened 10 locations across the east coast.' },
  { year: '2014', label: 'Renovation', emoji: '🏡', desc: 'Redesigned all restaurant interiors with modern Italian style.' },
  { year: '2020', label: 'Digital Launch', emoji: '📱', desc: 'Launched online ordering and delivery platform.' },
];

export default function JourneySection() {
  const [current, setCurrent] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Red pepper: 3D spin continuously + moves down on scroll
  const pepperY = useTransform(scrollYProgress, [0, 1], ['-30px', '60px']);

  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(timelineItems.length - 1, c + 1));

  return (
    <section ref={sectionRef} className="py-20 bg-white relative overflow-hidden">
      {/* 3D spinning red pepper - moves down on scroll */}
      <motion.div
        style={{ y: pepperY }}
        className="absolute left-4 top-8 text-6xl z-10 hidden lg:block"
        animate={{ rotateY: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        🫑
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3"
          >
            OUR LAST 16 YEARS JOURNEY
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-black text-gray-900 uppercase leading-tight max-w-2xl mx-auto"
          >
            WE ARE APARTE A YOUNG AND BEAUTIFUL TEAM WITH A PASSION FOR TASTY AND TRADITIONAL FOOD REDISCOVERING AND RELIEVING TRADITIONAL ROMANIAN DELICACIES.
          </motion.h2>
        </div>

        {/* Timeline with < > navigation */}
        <div className="relative">
          {/* Red horizontal line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#c8102e] z-0" style={{ top: '60%' }} />

          {/* Images row */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-3 gap-4 relative z-10"
            >
              {timelineItems.slice(current, current + 3).map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.03 }}
                  className="relative rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className={`w-full h-48 flex items-center justify-center text-[80px] ${
                    i === 1 ? 'bg-amber-100' : 'bg-gray-200'
                  } ${i !== 1 ? 'filter grayscale group-hover:grayscale-0 transition-all duration-500' : ''}`}>
                    {item.emoji}
                  </div>
                  {/* Year overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-black text-2xl drop-shadow-lg">{item.year}</span>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#c8102e] opacity-0 group-hover:opacity-10 transition-opacity" />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#c8102e', color: 'white', borderColor: '#c8102e' }}
              whileTap={{ scale: 0.9 }}
              onClick={prev}
              disabled={current === 0}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 transition-all"
            >
              <ChevronLeft size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#c8102e', color: 'white', borderColor: '#c8102e' }}
              whileTap={{ scale: 0.9 }}
              onClick={next}
              disabled={current >= timelineItems.length - 3}
              className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center disabled:opacity-30 transition-all"
            >
              <ChevronRight size={18} />
            </motion.button>
          </div>

          {/* Timeline dots */}
          <div className="flex justify-center gap-2 mt-4">
            {timelineItems.map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setCurrent(Math.max(0, i - 1))}
                animate={{ scale: i >= current && i < current + 3 ? 1.4 : 1 }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i >= current && i < current + 3 ? 'bg-[#c8102e]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
