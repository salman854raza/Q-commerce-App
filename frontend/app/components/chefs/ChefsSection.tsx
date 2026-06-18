'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const chefs = [
  { name: 'John Richards', cuisine: 'Indian cuisine', emoji: '👨‍🍳' },
  { name: 'Marta Warner', cuisine: 'Mexico cuisine', emoji: '👩‍🍳' },
  { name: 'Queen Ferrari', cuisine: 'France cuisine', emoji: '👩‍🍳' },
  { name: 'Antony Taylor', cuisine: 'Thailand cuisine', emoji: '👨‍🍳' },
  { name: 'Lucky Green', cuisine: 'Japan cuisine', emoji: '👨‍🍳' },
  { name: 'Taylor Habbant', cuisine: 'Greece cuisine', emoji: '👨‍🍳' },
  { name: 'Sara Welch', cuisine: 'Indian cuisine', emoji: '👩‍🍳' },
  { name: 'Jemmy Smith', cuisine: 'Head chef', emoji: '👨‍🍳' },
];

export default function ChefsSection() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-20 bg-white">
      {/* Masterchef Feature */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Head chef visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center"
          >
            <div className="relative w-64 h-64">
              {/* Circular text badge */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute -left-4 top-8 w-20 h-20 rounded-full border-2 border-gray-200 flex items-center justify-center z-10"
              >
                <span className="text-xs font-bold text-gray-400 text-center leading-tight">REAL FOOD FROM ITALY</span>
              </motion.div>
              <div className="w-full h-full rounded-full bg-gradient-to-b from-gray-100 to-gray-200 flex items-end justify-center overflow-hidden">
                <span className="text-[120px] leading-none">👨‍🍳</span>
              </div>
              {/* Decorative chili */}
              <motion.div
                animate={{ rotate: [-15, 15, -15] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-0 right-0 text-4xl"
              >
                🌶️
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-6 h-0.5 bg-[#c8102e]" />
              MASTERCHEF&apos;S MESSAGE
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 uppercase mb-4">HERMAN MILER</h2>
            <p className="text-gray-700 font-semibold mb-3">Unique and delicious dishes from the worlds best masterchefs.</p>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Lorem ipsum dolor sit amet consectetur pellentesque blandit ultrices purus suspendisse iaculis ultricies sagittis. Proin vulputate eleifend cras lacinia iaculis feugiat egestas neque sodales.
            </p>
            <p className="text-2xl text-[#c8102e]" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
              Herman miller
            </p>
            <div className="w-24 h-0.5 bg-[#c8102e] mt-2" />
          </motion.div>
        </div>
      </div>

      {/* World's Best Chefs Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="flex items-center gap-4 mb-10">
          <p className="text-[#c8102e] text-sm font-semibold uppercase tracking-widest">MEET OUR CHEF</p>
          <span className="w-px h-8 bg-gray-200" />
          <h2 className="text-4xl font-black text-gray-900 uppercase">WORLD&apos;S BEST CHEFS</h2>
        </div>

        {/* Floating tomato decoration */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            className="absolute -right-4 top-0 text-5xl hidden lg:block"
          >
            🍅
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {chefs.map((chef, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="text-center cursor-pointer group"
              >
                <div className="w-full aspect-square bg-gray-100 rounded-lg flex items-center justify-center text-[80px] mb-3 overflow-hidden group-hover:bg-red-50 transition-colors">
                  {chef.emoji}
                </div>
                <h4 className="font-bold text-gray-900 text-sm uppercase tracking-wide">{chef.name}</h4>
                <p className="text-gray-400 text-xs mt-1">{chef.cuisine}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
