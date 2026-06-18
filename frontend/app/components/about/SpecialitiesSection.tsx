'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const specialities = [
  { title: 'Free Cold Drinks', desc: 'Lorem ipsum simply dolor eiusmod tempor.', icon: '🍹', image: '👩‍🍷' },
  { title: 'Quality Foods', desc: 'Lorem ipsum simply dolor eiusmod tempor.', icon: '🌿', image: '🍅' },
  { title: 'Popular Masterchef', desc: 'Lorem ipsum simply dolor eiusmod tempor.', icon: '👨‍🍳', image: '👨‍🍳' },
  { title: 'Delicious Recipes', desc: 'Lorem ipsum simply dolor eiusmod tempor.', icon: '🍕', image: '🍢' },
];

function FlipCard({ item, index }: { item: typeof specialities[0]; index: number }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateY: 90 }}
      animate={inView ? { opacity: 1, rotateY: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
      className="grid grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
      style={{ perspective: 1000 }}
    >
      {/* Image half */}
      <div className="bg-gray-100 flex items-center justify-center h-40 text-[80px]">
        {item.image}
      </div>
      {/* Text half */}
      <div className="bg-white flex flex-col justify-center p-4">
        <span className="text-2xl mb-2">{item.icon}</span>
        <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.title}</h4>
        <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
      </div>
    </motion.div>
  );
}

export default function SpecialitiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] });

  // Tomato image: spins continuously AND moves down on scroll
  const tomatoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const tomatoY = useTransform(scrollYProgress, [0, 1], ['-20px', '60px']);

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section ref={sectionRef} className="py-20 bg-[#f9f9f9] relative overflow-hidden">
      {/* Spinning tomato - moves down on scroll */}
      <motion.div
        style={{ rotate: tomatoRotate, y: tomatoY }}
        className="absolute left-0 top-0 text-6xl z-10 hidden lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        🍅
      </motion.div>

      {/* Small decorative dots */}
      <div className="absolute right-8 top-16 flex gap-2">
        <div className="w-2 h-2 rounded-full bg-gray-300" />
        <div className="w-2 h-2 rounded-full bg-[#c8102e]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#c8102e] text-sm font-semibold uppercase tracking-widest"
          >
            HEART OF KITCHEN
          </motion.p>
          <span className="w-px h-8 bg-gray-300" />
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="text-4xl md:text-5xl font-black text-gray-900 uppercase"
          >
            OUR SPECIALITIES
          </motion.h2>
        </div>

        {/* Flip Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specialities.map((item, i) => (
            <FlipCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Stats Counter */}
        <div className="grid grid-cols-4 gap-8 mt-16">
          {[
            { num: 45, label: 'WORKERS' },
            { num: 58, label: 'MENU' },
            { num: 12, label: 'EXPERIENCE' },
            { num: 95, label: 'CHEFS' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="text-center"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.1, duration: 1 }}
                className="text-5xl md:text-6xl font-black text-[#d4a017] block"
              >
                {stat.num}
              </motion.span>
              <span className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1 block">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
