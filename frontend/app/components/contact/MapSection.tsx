'use client';

import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="py-0">
      <div className="relative w-full h-80 bg-gray-200 overflow-hidden">
        {/* Simulated map */}
        <div className="absolute inset-0 map-placeholder flex items-center justify-center">
          <div className="grid grid-cols-8 grid-rows-6 w-full h-full opacity-20">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-400" />
            ))}
          </div>
          {/* Roads */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-0 right-0 h-0.5 bg-white opacity-60" />
            <div className="absolute top-2/3 left-0 right-0 h-0.5 bg-white opacity-40" />
            <div className="absolute left-1/3 top-0 bottom-0 w-0.5 bg-white opacity-60" />
            <div className="absolute left-2/3 top-0 bottom-0 w-0.5 bg-white opacity-40" />
          </div>
        </div>

        {/* Location pin */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative">
            <MapPin size={48} className="text-[#c8102e] fill-[#c8102e]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-black/20 rounded-full blur-sm" />
          </div>
        </motion.div>

        {/* Info card */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 mt-8 bg-white shadow-2xl p-5 w-64 z-20"
          style={{ marginTop: '60px' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="font-bold text-sm mb-1">Crafto Pizza Parlor</h3>
          <p className="text-xs text-gray-500 mb-3">
            16122 Collins street,<br />Melbourne, Australia
          </p>
          <button className="w-full bg-[#1a1a1a] text-white text-xs font-bold uppercase py-2 px-4 flex items-center justify-center gap-2 hover:bg-[#333] transition-colors">
            <Navigation size={12} /> VIEW LARGER MAP
          </button>
        </motion.div>
      </div>
    </section>
  );
}
