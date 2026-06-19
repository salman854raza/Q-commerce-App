'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  { icon: '🍎', title: 'ALWAYS SERVE FRESH FOOD', desc: 'Perfectly portioned ingredients.' },
  { icon: '👍', title: 'MAINTAINING THE QUALITY OF FOOD', desc: 'Standardized food recipes for menu.' },
  { icon: '👨‍🍳', title: 'WE HAVE POPULAR MASTERCHEF', desc: 'The patient staff reflects the style.' },
  { icon: '🎵', title: 'BEST LIVE MUSIC RESTAURANTS', desc: 'Beautiful natural & serene ambience.' },
  { icon: '🍕', title: 'DELICIOUS PIZZA RECIPES', desc: 'Best crust with this good recipe.' },
  { icon: '✈️', title: 'WONDERFUL DINING EXPERIENCE', desc: 'A memorable dining atmosphere.' },
];

export default function WhyChooseUsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
          <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">WHY CHOOSE US?</span>
          <div className="w-px h-8 bg-gray-200" />
          <h2 className="text-4xl md:text-5xl font-black text-gray-200">WE ARE KNOWN</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-0">
          {features.map((f, i) => (
            <motion.div key={f.title}
              className="flex items-center gap-5 py-5 border-b border-gray-100"
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center flex-shrink-0 text-2xl">
                {f.icon}
              </div>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-wider mb-0.5">{f.title}</h3>
                <p className="text-gray-500 text-xs">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Offer banners */}
        <div className="grid md:grid-cols-2 gap-4 mt-16">
          {[
            { label: 'MOST POPULAR', title: 'SPECIAL DELICIOUS', badge: 'FREE DRINKS', emoji: '🍕', color: '#1a1a1a' },
            { label: 'ORDER $50', title: 'FASTEST DELIVERY', badge: null, emoji: '🛵', color: '#c8102e' },
          ].map((banner, i) => (
            <motion.div key={banner.title}
              className="relative overflow-hidden rounded-sm p-8 flex items-center gap-6 cursor-pointer group"
              style={{ background: banner.color }}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.15 }}
              whileHover={{ scale: 1.02 }}>
              <div className="text-white flex-1">
                <p className="text-[#d4a017] text-xs font-bold uppercase tracking-widest mb-1">{banner.label}</p>
                <h3 className="text-2xl font-black leading-tight">{banner.title}</h3>
                <button className="mt-4 bg-white text-[#1a1a1a] text-xs font-bold uppercase px-4 py-2 hover:bg-gray-100 transition-colors">
                  ORDER NOW
                </button>
              </div>
              <div className="relative">
                <span className="text-6xl group-hover:scale-110 transition-transform block">{banner.emoji}</span>
                {banner.badge && (
                  <span className="absolute -top-3 -right-3 bg-[#d4a017] text-white text-xs font-black w-14 h-14 rounded-full flex items-center justify-center text-center leading-tight">
                    {banner.badge}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
