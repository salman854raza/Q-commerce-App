'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const masterchef = {
  name: 'HERMAN MILER',
  subtitle: 'Unique and delicious dishes from the worlds best masterchefs.',
  desc: 'Lorem ipsum dolor amet consectetur pellentesque blandit ultrices purus suspendisse iaculis ultrices sagittis. Proin vulputate eleifend cras lacinia iaculis feugiat egestas neque sodales.',
  signature: 'Herman miller',
  emoji: '👨‍🍳',
};

const chefs = [
  { name: 'JOHN RICHARDS', cuisine: 'Indian cuisine', emoji: '👨‍🍳' },
  { name: 'MARTA WARNER', cuisine: 'Mexico cuisine', emoji: '👩‍🍳' },
  { name: 'QUEEN FERRARI', cuisine: 'France cuisine', emoji: '👩‍🍳' },
  { name: 'ANTONY TAYLOR', cuisine: 'Thailand cuisine', emoji: '👨‍🍳' },
  { name: 'LUCKY GREEN', cuisine: 'Japan cuisine', emoji: '👨‍🍳' },
  { name: 'TAYLOR HABBANT', cuisine: 'Greece cuisine', emoji: '👨‍🍳' },
  { name: 'SARA WELCH', cuisine: 'Indian cuisine', emoji: '👩‍🍳' },
  { name: 'JEMMY SMITH', cuisine: 'Head chef', emoji: '👨‍🦳' },
];

export default function ChefsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref}>
      {/* Masterchef section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - masterchef image */}
            <motion.div className="relative"
              initial={{ opacity: 0, x: -50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
              <div className="relative w-full max-w-md">
                {/* Circle bg */}
                <div className="w-80 h-80 rounded-full bg-gray-100 mx-auto flex items-center justify-center relative overflow-hidden">
                  <span className="text-[160px] leading-none">{masterchef.emoji}</span>
                  {/* Rotating badge */}
                  <motion.div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300"
                    animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white rounded-full px-3 py-1 text-[9px] font-bold text-gray-500 uppercase tracking-widest whitespace-nowrap shadow">
                      THE ORIGINAL FOOD TABLE · ITALY ·
                    </div>
                  </motion.div>
                </div>
                {/* Floating ingredient */}
                <motion.div className="absolute bottom-8 right-8 text-4xl animate-float">🌶️</motion.div>
              </div>
            </motion.div>

            {/* Right - info */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}>
              <p className="text-[#c8102e] font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                <span className="w-6 h-0.5 bg-[#c8102e]" /> MASTERCHEF'S MESSAGE
              </p>
              <h2 className="text-5xl font-black mb-3">{masterchef.name}</h2>
              <p className="font-semibold text-gray-700 mb-4">{masterchef.subtitle}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">{masterchef.desc}</p>
              <p className="text-3xl text-gray-700 border-b-2 border-[#c8102e] pb-1 inline-block" style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
                {masterchef.signature}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Chef grid */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}>
            <span className="text-[#c8102e] font-bold text-sm uppercase tracking-widest">MEET OUR CHEF</span>
            <div className="w-px h-8 bg-gray-300" />
            <h2 className="text-4xl font-black">WORLD'S BEST CHEFS</h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {chefs.map((chef, i) => (
              <motion.div key={chef.name} className="group text-center"
                initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}>
                <div className="relative overflow-hidden bg-gray-100 mb-3 aspect-square flex items-center justify-center hover-lift">
                  <motion.span className="text-[100px] leading-none group-hover:scale-110 transition-transform duration-300">
                    {chef.emoji}
                  </motion.span>
                  <motion.div className="absolute inset-0 bg-[#c8102e]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-white text-center p-4">
                      <p className="font-black text-sm">{chef.name}</p>
                      <p className="text-xs mt-1 opacity-80">{chef.cuisine}</p>
                    </div>
                  </motion.div>
                </div>
                <h3 className="font-bold text-xs uppercase tracking-wide">{chef.name}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{chef.cuisine}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
