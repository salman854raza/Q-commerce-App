'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const steps = [
  { num: '01', title: 'WRITE APPLICATION', desc: 'Lorem ipsum is simply text printing typesetting.', icon: '📋' },
  { num: '02', title: 'PHONE INTERVIEW', desc: 'Lorem ipsum is simply text printing typesetting.', icon: '📞' },
  { num: '03', title: 'PANEL INTERVIEW', desc: 'Lorem ipsum is simply text printing typesetting.', icon: '👥' },
  { num: '04', title: 'OPEN FOR BUSINESS', desc: 'Lorem ipsum is simply text printing typesetting.', icon: '🏪' },
];

export default function FranchiseStepsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Steps */}
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {/* Connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-gray-200 hidden md:block" />
          {steps.map((step, i) => (
            <motion.div key={step.num} className="relative text-center z-10"
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6 }}>
              {/* Icon */}
              <div className="w-16 h-16 bg-[#f5f5f5] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl border-2 border-white shadow-md">
                {step.icon}
              </div>
              <h3 className="font-bold text-xs uppercase tracking-wider mb-2">{step.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed max-w-[120px] mx-auto">{step.desc}</p>
              {/* Number circle */}
              <div className="w-10 h-10 rounded-full border-2 border-gray-200 flex items-center justify-center mx-auto mt-4 bg-white">
                <span className="text-xs font-bold text-gray-500">{step.num}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Franchise banner */}
        <motion.div className="flex items-center justify-center gap-4 py-6 border-y border-gray-100"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.6 }}>
          <div className="w-10 h-10 bg-[#c8102e] rounded-full flex items-center justify-center text-white">🍕</div>
          <p className="font-medium text-sm">
            Looking for a franchise that focuses on quality food?{' '}
            <a href="#contact-form" className="text-[#c8102e] font-black uppercase hover:underline">JOIN THE NETWORK</a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
