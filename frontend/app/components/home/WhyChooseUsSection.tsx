'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Apple, ThumbsUp, ChefHat, Music, Pizza, Wind } from 'lucide-react';

const features = [
  { icon: Apple, title: 'Always Serve Fresh Food', desc: 'Perfectly portioned ingredients.' },
  { icon: ThumbsUp, title: 'Maintaining the Quality of Food', desc: 'Standardized food recipes for menu.' },
  { icon: ChefHat, title: 'We Have Popular Masterchef', desc: 'The patient staff reflects the style.' },
  { icon: Music, title: 'Best Live Music Restaurants', desc: 'Beautiful natural & serene ambience.' },
  { icon: Pizza, title: 'Delicious Pizza Recipes', desc: 'Best crust with this good recipe.' },
  { icon: Wind, title: 'Wonderful Dining Experience', desc: 'A memorable dining atmosphere.' },
];

export default function WhyChooseUsSection() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-[#c8102e] text-sm font-semibold uppercase tracking-widest"
          >
            WHY CHOOSE US?
          </motion.p>
          <span className="w-px h-8 bg-gray-200" />
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            className="text-3xl md:text-4xl font-black text-gray-200 uppercase"
          >
            WE ARE KNOWN
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 8 }}
              className="flex items-start gap-4 p-4 border border-gray-100 rounded-lg hover:border-[#c8102e] hover:shadow-md transition-all cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center flex-shrink-0">
                <feature.icon size={20} className="text-gray-500" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{feature.title}</h4>
                <p className="text-gray-400 text-sm mt-1">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Promo banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {/* Special Delicious */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-gray-900 rounded-2xl overflow-hidden p-6 flex items-center gap-4 cursor-pointer"
          >
            <div>
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest">MOST POPULAR</span>
              <h3 className="text-white text-2xl font-black uppercase leading-tight mt-1">
                SPECIAL<br />DELICIOUS
              </h3>
              <button className="mt-3 bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide hover:bg-[#c8102e] hover:text-white transition-colors">
                ORDER NOW
              </button>
            </div>
            <div className="ml-auto text-6xl">🍕</div>
            <div className="absolute top-4 right-16 w-16 h-16 rounded-full bg-[#d4a017] flex items-center justify-center">
              <span className="text-white text-xs font-black text-center leading-tight">FREE<br />DRINKS</span>
            </div>
          </motion.div>

          {/* Fastest Delivery */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            className="relative bg-gray-900 rounded-2xl overflow-hidden p-6 flex items-center gap-4 cursor-pointer"
          >
            <div>
              <span className="text-[#c8102e] text-xs font-bold uppercase tracking-widest">ORDER $50</span>
              <h3 className="text-white text-2xl font-black uppercase leading-tight mt-1">
                FASTEST<br />DELIVERY
              </h3>
              <button className="mt-3 bg-white text-gray-900 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wide hover:bg-[#c8102e] hover:text-white transition-colors">
                ORDER NOW
              </button>
            </div>
            <div className="ml-auto text-6xl">🛵</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
