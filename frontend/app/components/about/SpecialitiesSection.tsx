'use client';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const specialities = [
  { title: 'FREE COLD DRINKS', icon: '🍷', desc: 'Lorem ipsum simply dolor eiusmod tempor.', img: '👩' },
  { title: 'QUALITY FOODS', icon: '🌿', desc: 'Lorem ipsum simply dolor eiusmod tempor.', img: '🍕' },
  { title: 'POPULAR MASTERCHEF', icon: '👨‍🍳', desc: 'Lorem ipsum simply dolor eiusmod tempor.', img: '👨‍🍳' },
  { title: 'DELICIOUS RECIPES', icon: '🍽️', desc: 'Lorem ipsum simply dolor eiusmod tempor.', img: '🥘' },
];

function FlipCard({ item, index }: { item: typeof specialities[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div ref={ref} className="perspective h-56"
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.6 }}>
      <div className="card-flip w-full h-full">
        <div className="card-inner">
          {/* Front - image */}
          <div className="card-front">
            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-sm overflow-hidden">
              <span className="text-8xl">{item.img}</span>
            </div>
          </div>
          {/* Back - info */}
          <div className="card-back bg-white border border-gray-100 shadow-lg p-6 flex flex-col justify-center rounded-sm">
            <span className="text-3xl mb-3">{item.icon}</span>
            <h3 className="font-bold text-sm tracking-wider mb-2">{item.title}</h3>
            <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function SpecialitiesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const tomatoY = useTransform(scrollYProgress, [0, 1], [-40, 80]);
  const tomatoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Delivery banner */}
      <div className="bg-white border-b border-gray-100 py-4 mb-16">
        <motion.div className="max-w-4xl mx-auto flex items-center justify-center gap-3 px-4"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-2xl">🛵</span>
          <p className="text-sm font-semibold text-gray-700">
            GET FREE DELIVERY YOUR FOOD OF HAPPINESS IN{' '}
            <span className="text-[#c8102e] font-black uppercase">WITHIN 30 MINUTES.</span>
          </p>
        </motion.div>
      </div>

      {/* Spinning tomato - moves down on scroll */}
      <motion.div className="absolute left-4 top-32 w-20 h-20 pointer-events-none z-10" style={{ y: tomatoY, rotate: tomatoRotate }}>
        <span className="text-6xl img-3d block">🍅</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">HEART OF KITCHEN</span>
          <div className="w-px h-8 bg-gray-300" />
          <h2 className="text-3xl md:text-4xl font-black">OUR SPECIALITIES</h2>
        </motion.div>

        {/* Grid - image + text alternating (flip on scroll) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specialities.map((item, i) => (
            <FlipCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8 mt-16 py-12 border-t border-gray-200">
          {[
            { num: '45', label: 'WORKERS' },
            { num: '58', label: 'MENU' },
            { num: '12', label: 'EXPERIENCE' },
            { num: '95', label: 'CHEFS' },
          ].map((stat, i) => (
            <motion.div key={stat.label} className="text-center"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}>
              <div className="stat-number">{stat.num}</div>
              <p className="text-xs text-gray-500 font-semibold tracking-widest mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
